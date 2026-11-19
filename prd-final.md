# CultureFit — Final Product Requirements Document

**Scope:** The implemented CultureFit prototype, building on the checkpoint's basic guide and the subsequent live-AI upgrade. Historical checkpoint evidence and newer live-model observations are distinguished below. This document describes repository functionality, not a claim that the latest version has been published or tested with real employees.

## 1. Problem and Primary User

Starting a new job requires learning expectations that a job description may not explain: what to wear, how to ask questions, and how to become comfortable with a team. Generic onboarding advice often leaves employees to translate broad suggestions into actions for their own workplace.

CultureFit's primary user is a new professional preparing for or navigating their first month in an unfamiliar workplace. They may have limited information about team norms, a restricted clothing budget, or concerns about asking questions without appearing unprepared.

The product turns a short workplace brief into three practical sections: **Wear**, **Ask**, and **Settle in**. Its intended benefit is to help employees prepare, take small relationship-building steps, and feel more like themselves at work—not pressure them to conform to an assumed standard. Improved confidence, belonging, and employer retention are goals, not demonstrated outcomes.

## 2. Central User Journey

1. **Start:** Select **Build My Guide**.
2. **Describe the situation:** Enter a role, choose in-person, hybrid, or remote work, and select one to three priorities. Optional context includes employer/team, dress guidance, onboarding notes, location, a public source URL, client contact, budget, comfort preferences, and clothes already owned.
3. **Choose a mode:** Use **Live AI + web research** after reviewing the processing notice and giving consent, or deliberately select **Basic guide · no web**.
4. **Receive a guide:**
   - **Wear:** first-day/everyday and meeting suggestions, an alternative, reasoning, and a confirmation question.
   - **Ask:** usable question scripts, including whom to ask and when.
   - **Settle in:** three first-month milestones with checkboxes.
   - Live mode also displays research findings, sources, lookup date, and unknowns separately from personalized suggestions.
5. **Decide and adjust:** Check relevant sources, confirm important expectations with a manager, edit the brief and regenerate, or start over. Checklist progress and reflection remain in the current browser session and are lost on reload.

Live research can be canceled. Errors retain the user's answers and offer retry or an intentional switch to basic mode; the product does not silently replace failed research with simulated results.

## 3. Features and Status

| Feature | Actual status and boundary |
| --- | --- |
| Brief and validation | **Functional:** required role, work setting, and one to three priorities; optional context and preferences. |
| Three-part guide | **Functional:** outfit suggestions, question scripts, and three milestones are displayed. |
| Live AI and public research | **Functional:** real server-side model/search requests after consent, with structured results and explicit errors. |
| Source and uncertainty display | **Functional, with partial reliability:** sources and unknowns appear, but links do not prove that a claim is correct or applicable. |
| Occasion-specific dress advice | **Functional, with limitations:** distinguishes everyday and meeting context; can still recommend more formality than the evidence justifies. |
| Milestone timing | **Partial:** three items are enforced; the intended week-one, week-two, and day-30 coverage is not fully enforced. |
| Basic guide | **Simulated AI:** local rules, prepared suggestions, and a simulated delay; no model or web search. Extra live-personalization fields are not interpreted. |
| Cancel, retry, edit, reset | **Implemented:** current live-browser usability of every control has not received a new full evaluation. |
| Checklist and reflection | **Functional, session-only:** no durable saved plan or cross-device access. |
| Policy confirmation | **Manual:** the employee checks sources and asks an appropriate workplace contact. No hidden human operator creates the guide. |
| Accounts, saved plans, private HR integrations | **Not implemented; future possibilities.** |

## 4. AI Role, Value, and User Control

**Task and place in the flow:** After the brief and consent, live AI researches public workplace/role information and drafts the personalized guide. It advises; it does not certify an employer's rules or act on the employee's behalf.

**Inputs:** Role, environment, priorities, and optional employer/team, experience, workplace type, dress guidance, notes, location, public URL, budget, wardrobe/comfort preferences, and client contact. The separate first-name and reflection fields are excluded from live requests.

**Outputs:** A research summary, source-linked findings, unknowns, outfit suggestions with an alternative and confirmation question, question scripts, and exactly three milestones. Instructions request two to four scripts and week-one/week-two/day-30 timing; those instructions should not be mistaken for guaranteed output quality.

**Why AI rather than only rules, search, or templates:** Rules provide a predictable basic experience but cover limited wording and combinations. Search supplies pages but leaves the employee to interpret them. AI can combine the employee's constraints with public material and translate it into concise actions and questions. That flexibility is useful, but it introduces variable wording, unsupported assumptions, and possible source misinterpretation.

**User control:** Employees can omit optional details, decline live processing, inspect sources and unknowns, cancel, revise, regenerate, or reject recommendations. Workplace confirmation remains essential. The app cannot access private team policies unless the employee supplies relevant nonconfidential context.

## 5. Implementation Overview

```text
React/TypeScript interface
  ├─ Basic mode → local rules/prepared suggestions → guide
  └─ Live mode + consent → Express API → OpenAI model + public web search
                                      → validated response/source links → guide

Employee → checks sources and confirms expectations with their workplace
```

The frontend uses React and Vite. The Express/TypeScript backend validates the brief and calls OpenAI's Responses API using **gpt-5-mini** with required **web_search_preview**, through Replit AI Integrations. Model credentials remain server-side. OpenAPI contracts and validation schemas define the request and response structure.

The server checks that finding URLs occur in provider-returned retrieval/citation metadata and removes findings without matching links. This verifies link provenance, **not** whether the source supports the exact claim or applies to the right employer, team, or location.

There is no database-backed plan storage. Live processing uses provider services and project AI credits. Consent, input checks, timeouts, cancellation, and process-local rate/concurrency limits are implemented. Users should not enter confidential information. Requests specify `store: false`, but this and session-only app storage do not guarantee zero provider retention.

## 6. Evidence and Product Decisions

Evidence comes from recorded prototype tests and supplied feedback, not a new study conducted for this document.

| Finding | Decision and what the evidence supports |
| --- | --- |
| A peer reported that “casual everyday, business casual for client meetings” was ignored. | Preserve the design but separate everyday and meeting advice and treat supplied notes as unverified context. The later live mixed-dress case passed that distinction, although first-day advice still leaned formal. This supports a narrow improvement, not general policy accuracy. |
| The November 16 basic-mode browser evaluation initially produced four passes and one failure: “professional but casual” was treated too confidently. | Add a narrow ambiguity safeguard. Only the failed case was retested and passed. This supports that specific basic-mode correction; it does not establish live-model reliability. |
| The November 17 live-endpoint evaluation produced two passes and three partial results across five distinct cases. | Retain live research and personalization while reporting remaining uncertainty. Owned-clothes personalization worked, but an interview source was extended toward employee guidance. Three identical challenge trials varied in formality and still assumed a baseline; the risk case omitted week two. Prioritize source applicability and conditional advice. |

**Linked evidence:**


Six valid live requests, including challenge repeats, returned HTTP 200 in approximately 28–36 seconds; the empty request returned HTTP 400. These are API observations, not a complete live-browser journey or a factual audit. No evidence establishes improved belonging, confidence, or retention, comprehensive accessibility, or current public-build correctness.

## 7. Limitations and Next Priorities

**Supported use:** Low-stakes preparation, conversation starters, and tentative first-month planning based on nonconfidential context. Safety-critical uniform/PPE requirements and actual team policies must come from the workplace, not this guide.

**Known constraints:** Public information may be outdated or irrelevant; cited claims can overreach; warnings do not prevent prescriptive advice or over-reliance. Live responses vary, take time, and incur usage costs. Process-local limits are not guaranteed spending caps. Progress is not saved across reloads, and publication/version access requires separate verification.

**Most valuable next step:** Make uncertain recommendations reliably conditional. Audit source-to-claim applicability, prevent interview guidance from becoming employee policy, and validate milestone timeframes as well as item count. Then evaluate the revised flow with new employees using synthetic briefs to check whether they understand what is evidence, what is a suggestion, and what needs confirmation. Saved plans and wider promotion should follow reliability and privacy work, not substitute for it.
