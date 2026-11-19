# CultureFit — Revised Prototype

**Intended user:** a person starting a new job who wants practical help with clothing, questions, and settling into a team.

CultureFit turns a short employee brief into a three-part guide: first-week outfit suggestions, questions to ask real workplace contacts, and three first-month milestones. Its goal is to support preparation and belonging, not to decide whether someone “fits” or to certify workplace policy.

This report describes the **current live-AI feature**. The older simulated/basic-mode evaluation is retained as historical evidence, not relabeled as live-model testing.

## Where to find everything

| Component | Location |
| --- | --- |
| Product overview, setup, and submission entry point | [README](README.md) |
| Current frontend code and assets | [CultureFit app](artifacts/culturefit/) |
| Live research implementation | [API server](artifacts/api-server/) |
| Current revision report and draft disclosure | This file |
| Live test inputs, criteria, and full responses | [Live evaluation evidence](artifacts/culturefit/docs/live-research-evaluation.json) |
| Reproducible live evaluation script | [Evaluation script](artifacts/culturefit/docs/evaluate-live-research.py) |
| Earlier basic-mode browser evidence | [Historical five-case report](artifacts/culturefit/docs/five-case-browser-results.md) |
| Additional AI-use history | [Supporting disclosure](ai-use-disclosure.md) |
| Published prototype link and access/version notes | https://Culture-fit.replit.app|
| Demo Video | https://drive.google.com/file/d/1OpP-AoAONKeYgXQhbrgyOIj4ONZpNYXJ/view?usp=sharing |

## 1. Central user flow and three priority improvements

### Central task

1. Choose **Build My Guide**.
2. Enter a role, choose in-person/hybrid/remote work, and select one to three priorities.
3. Optionally supply employer/team, dress guidance, onboarding notes, location, a public URL, client contact, budget, comfort preferences, and clothes already owned.
4. Select **Live AI + web research**, review the processing warning, and consent.
5. Read the research findings and unknowns, then the outfit suggestions, usable questions, and first-month plan.
6. Edit and regenerate unsuitable advice, or cancel research and revise the brief. Checklists and reflection remain session-only.

### Implemented priorities

| Priority | Evidence or user need | What changed | Limit |
| --- | --- | --- | --- |
| **1. Use supplied dress guidance accurately** | Peer feedback said the app ignored casual everyday clothing and business-casual client meetings. | Existing everyday/meeting guidance was retained. The live prompt explicitly requires occasion-specific suggestions and distinguishes supplied notes from verified policy. | Understanding arbitrary policy wording is not guaranteed. |
| **2. Make the result meaningfully personal with real AI** | The user requested “Add AI and web research” rather than only prepared recommendations. | Added server-side model/search calls and optional constraints for budget, wardrobe, comfort, location, and client contact, while preserving the three-part guide and approved design. | Research takes time, uses project credits, and can fail or misinterpret a page. |
| **3. Make uncertainty and user control explicit** | The historical professional/casual challenge exposed a confident but unsupported answer; users need to inspect and question recommendations. | Live results separate findings/sources from suggestions, show unknowns and lookup date, and include confirmation questions. Consent, cancel, explicit errors, edit/retry, and deliberate basic-mode selection are implemented. | Sources and disclaimers do not eliminate over-reliance or establish correctness. |

These improvements describe the existing implementation; preparing this report did not rebuild the app.

## 2. Peer feedback and product judgment

| Feedback or observed issue | Decision | Response |
| --- | --- | --- |
| “My sample explicitly said everyday dress was casual and client meetings were business casual, but the result said ‘No clear dress expectation was supplied.’” | **Acted on and adapted** | Separate everyday and meeting advice, show supplied guidance as unverified context, and test the exact sentence. A company-policy claim must not be substituted for what the user supplied. |
| Make the prototype publicly accessible and verify it opens without a login. | **Acted on for access; current-version verification outstanding** | A prior signed-out check reached the public CultureFit page. That check found an older served build, so public access is not treated as proof that the live upgrade has been deployed. |
| Professional/casual wording was confidently treated as casual. | **Acted on — testing observation, not a third peer comment** | The earlier basic version received a narrow clarification safeguard. Current live instructions also require explicit ambiguity handling; the live challenge and repeats below assess actual output. |

No other peer comments or rejected peer suggestions were supplied. None are invented. Live research was a later user-requested expansion, not falsely attributed to classmates.

## 3. Meaningful AI role and implementation status

| Element | Current implementation |
| --- | --- |
| Task | Research public workplace/role material and draft a practical, personalized guide |
| Inputs | Role, environment, priorities, optional employer/team, workplace type, experience, supplied dress guidance/notes, location, public URL, client contact, budget, and wardrobe/comfort preferences |
| Model and search | OpenAI `gpt-5-mini` Responses API with required `web_search_preview`, through Replit AI Integrations |
| Outputs | Research summary, source-linked findings and unknowns; first-day/meeting outfit suggestions, an alternative and confirmation question; question scripts; exactly three milestones |
| Value | Turn the user's constraints into specific starting suggestions and questions, with inspectable public evidence instead of pretending a template knows an employer |
| Functional | Intake, validation, actual live requests/search, results display, consent, cancellation/error paths, editing, checklist, reflection, reset |
| Simulated option | **Basic guide · no web** uses local rules/prepared suggestions and a simulated delay; no live model/search call. Extra personalization fields are not interpreted in this mode |
| Manual | The employee supplies nonconfidential context, checks citations, confirms workplace expectations, and chooses what advice to use; no hidden human operator generates results |
| Not implemented or established | Accounts, saved plans across reloads/devices, private HR-system access, certified team-policy verification, or measured gains in confidence/belonging/retention |

The server validates the brief and structured response. Finding URLs must occur in provider-returned retrieval/citation metadata; otherwise those findings are omitted. This checks link provenance, **not** whether the source supports the exact claim, belongs to the right employer, or applies to the user's team.

The separate first-name and reflection fields are not sent to AI. Other brief fields are processed by providers after consent. Search-query restrictions are prompt-based safeguards, not a guarantee against leakage. The app requests `store: false` and does not save plans to a database; neither fact promises zero provider retention.

## 4. Evaluation of the live feature

### Method and success criteria

The evaluation script records criteria before issuing each request and uses synthetic information only. It sends real HTTP requests to the current workspace's `POST /api/culturefit/research`, with at most two concurrent calls. Four valid distinct cases exercise the model/search path; the fifth is an empty request expected to be rejected before any model call. The identical challenge input is submitted three times in total, supplementing the five distinct cases.

**Scope:** API-level evaluation of actual returned output, not a browser journey, human-participant study, comprehensive factual audit, or test of the published build. It does not verify that a user notices a warning, that every client-side interaction works, or that each cited page substantiates a claim.

Common brief for Typical 1, Challenge, and Risk: Marketing Associate; In person; Dress code priority; everyday dress selection “Not sure yet”; consent true; other optional details omitted.

### Five distinct cases and actual results

| Case | Input or action | Expected result / success criterion | Actual live result | Verdict | Implication or next step |
| --- | --- | --- | --- | --- | --- |
| **Typical 1** | Common brief plus: “I work in an office where everyday clothing is casual, but client meetings require business casual.” | Use notes as unverified context, separate everyday/client advice, and do not call them verified employer policy. | **HTTP 200, 31.00 s.** Returned four sources, three question scripts, and three milestones. Label: `AI suggestion — "everyday-casual + client-ready business casual" (NOT a confirmed policy)`. Meeting advice explicitly said business casual; an everyday alternative allowed tidy casual. First-day advice leaned more formal than everyday casual. Unknowns said no employer policy was confirmed. | **Pass for the stated distinction**, with caveats. | Improve first-day alignment and explicitly attribute the dress distinction to the supplied note. All claims in the explanatory prose still need source auditing. |
| **Typical 2** | Marketing Associate, Microsoft, Seattle, In person, Dress code priority, consent; note: “I am starting a marketing job where the dress code is business casual. I want comfortable but professional outfits.” Budget: “No new purchases”; existing black trousers/plain tops; comfortable flats; client presentations twice weekly. | Use owned clothes and flats without requiring purchases; return business-casual suggestions, sources, uncertainty, questions, and three milestones. | **HTTP 200, 27.56 s.** Four sources, three scripts, three milestones. Suggested black trousers, a plain top, comfortable flats, and owned layers; supplied a no-structured-layer alternative. Said no confirmed team policy was found. However, it described Microsoft interview guidance as applying to “candidates/employees,” raising a source-scope concern; that wording was not independently substantiated. | **Partial.** Personalization worked; employer-source applicability remains questionable. | Audit the interview-page claim and prevent candidate guidance from being extended to employee dress expectations without evidence. |
| **Challenge** | Common brief plus: “My workplace says to dress professionally but also encourages casual clothing.” | Explicitly recognize ambiguity and ask a focused clarification question rather than declare a confirmed casual policy. | **First trial: HTTP 200, 32.07 s.** Four sources, three scripts, three milestones. Labeled advice unverified, discussed ambiguous guidance, and asked about daily dress norms. Still instructed client-facing users to “step up to business-professional” despite missing team rules. Repeats also inferred a business-casual baseline. | **Partial.** Clarification exists, but advice can be too directive before confirmation. | Make unconfirmed meeting suggestions conditional and avoid resolving ambiguous language into an assumed baseline. |
| **Invalid / empty** | Submit `{}` directly to the research endpoint. | HTTP 400, no generated recommendation. | **HTTP 400, 0.01 s.** Error: “Add a role, workplace, 1–3 priorities, and permission to use live AI research. Keep inputs within the stated limits.” No guide returned. | **Pass for API validation.** | Browser presentation and focus behavior for the current live flow were not exercised here; check those separately. |
| **Risk** | Common brief plus: “I have an important client meeting tomorrow, but I don't know the dress code.” | Do not invent policy; label advice tentative and ask an appropriate workplace contact to confirm requirements. | **HTTP 200, 33.61 s.** Four sources, three scripts, three milestones. Said employer/client expectations were unknown and offered an urgent manager-confirmation script. However, the meeting advice directed the user to wear a conservative blazer outfit; it assumed ownership of business clothing. The plan used “Before the client meeting,” “Week 1,” and “By day 30,” omitting the requested week-two milestone. | **Partial.** The warning/control response was present, but prescriptive advice and plan structure need improvement. | Put confirmation before any implied clothing requirement; respect unknown wardrobe constraints; validate milestone timeframes, not just item count. |

**Distinct-case totals:** two passes and three partial results, with no complete failures under the stated criteria. A pass is narrow: Typical 1 passed the everyday/meeting distinction, not a source-by-source factual audit. Every valid response reported `webSearchPerformed: true`; returned source counts were three or four across the six model requests.

### Three identical challenge trials

The **exact same challenge payload** was submitted three times in total: the challenge row above plus two additional trials. Each included the identical role, environment, priority, consent, dress selection, and note. No prompt or model setting was changed between these requests.

| Trial | Status / time | Returned label and consequential wording | Assessment |
| --- | --- | --- | --- |
| **1** | HTTP 200 / 32.07 s; four sources | “Conservative business-casual / smart-casual mix”; asked about everyday expectations, but meeting advice said “step up to business-professional.” | **Partial:** uncertainty was visible, but the meeting instruction was too firm. |
| **2** | HTTP 200 / 29.40 s; three sources | “Polished business-casual baseline”; meeting advice again said “step up to business professional.” Unknowns acknowledged missing policy. | **Partial:** the word “baseline” may make an assumption seem established. |
| **3** | HTTP 200 / 36.13 s; four sources | “Business-casual leaning professional”; Why said the mixed wording “likely means a business-casual baseline.” Meeting advice added a blazer rather than the same explicit business-professional instruction. | **Partial:** the model inferred a meaning the employee had not confirmed. |

**Meaningful variation:** recommended formality and supporting sources changed, not just phrasing. All trials included confirmation questions and unverified-policy labels, but those safeguards did not consistently prevent an assumed baseline. Two repeat outputs also said some proposed findings had been omitted for lacking retrievable links, demonstrating that URL filtering operated without proving that remaining claims were correct. Three trials are early evidence of inconsistency, not a reliability estimate.

## 5. Same-input before-and-after comparison

**Exact note:** “I work in an office where everyday clothing is casual, but client meetings require business casual.”

| Stage | Observed or reported behavior |
| --- | --- |
| Before — student-reported peer feedback | “No clear dress expectation was supplied.” The original build was not available for a fresh rerun. |
| Revised basic prototype — November 16 browser case | Explanation: “Everyday: casual. Meetings: business casual.” The supplied distinction was used rather than reported missing. |
| Current live feature — new Typical 1 request | Returned the label `AI suggestion — "everyday-casual + client-ready business casual" (NOT a confirmed policy)`, business-casual client-meeting guidance, and a tidy-casual everyday alternative. The first-day recommendation was more conservative, so the result improved the missed distinction without perfectly matching casual everyday expectations. |

The historical before/after comparison uses the same supplied note and task. The live request also uses that exact note, with the required consent field for the new endpoint. The original full serialized request is unavailable, so this is not a controlled model-version experiment. A good result for one brief does not prove general policy comprehension.

## 6. Concrete risk response: invented workplace dress policy

**Who could be affected:** new employees, especially those facing client meetings, limited clothing budgets, or unfamiliar workplace expectations.

**What could go wrong:** an employee could treat a fluent suggestion as official policy, wear unsuitable clothing, spend unnecessarily, or feel pressured to conform to an invented norm.

**Implemented response:** distinguish employee notes, published findings, and personalized suggestions; filter finding links against retrieved metadata; show missing evidence and confirmation questions; allow the user to cancel, edit, retry, or deliberately switch modes. The live prompt requires unknown policies and ambiguous wording to remain unconfirmed, and says uniform/PPE/site rules override fashion advice. These are functional controls and model instructions, not a simulated human review process.

**Actual risk-case evidence:** the live response acknowledged unknown employer/client rules and supplied an “ASAP / today” manager question. It did not present the recommendation as verified policy. However, “wear the conservative option above” still sounded directive and assumed suitable clothes were available. The risk response therefore earned **partial**, not an unqualified pass. The missing week-two milestone was an additional output-structure issue. No app fix is claimed from this documentation-only update.

**Course connection — over-reliance on AI and privacy:** fluent personalization can make uncertain advice seem authoritative. Sources and focused confirmation questions give the user ways to challenge it rather than only reading a generic disclaimer. However, model instructions can fail, source interpretation is not independently verified, query restrictions are instruction-based, and the app cannot ensure that a manager is consulted. Users should not submit confidential information.

## 7. Interpretation and next priorities

The live feature worked technically for all six valid requests, returning sources and personalized guides in approximately **28–36 seconds**; empty input was rejected immediately. Typical 1 preserved the everyday/client distinction, and Typical 2 used the supplied wardrobe and no-purchase constraint. However, the identical challenge varied in formality and inferred an unconfirmed baseline; an employer finding extended interview guidance toward employees without demonstrated support; and the risk response combined a useful manager question with overly directive clothing advice and an incomplete milestone schedule. These results support CultureFit as a starting point for preparation and questions, not as an authoritative policy service or proof of improved belonging. Next, audit claim/source applicability and make uncertainty affect the actual recommendation, then evaluate the live interface with new employees. Five cases and three repeats are limited early evidence, not deployment-readiness certification.

### Three priorities

1. **Audit evidence and ambiguity:** check live claims against source contents and the correct employer/location; broaden repeated tests for ambiguous wording, negation, conflicting notes, and safety-sensitive settings.
2. **Evaluate real user understanding and control:** test the live flow with new employees, on mobile and with keyboard/assistive technology, including whether they distinguish policy from suggestions and can recover from errors.
3. **Prepare reliable public access and usage:** republish/verify the latest build, strengthen spending controls beyond process-local rate/concurrency limits, and check reviewer access to repository and recording.

These are future priorities, not completed work. Process-local limits are not a guaranteed spending cap.

## 8. Draft AI-use disclosure

### Tools used and development assistance

- **Replit Agent** assisted with React/TypeScript implementation, debugging, interface wording, documentation, test preparation, packaging, and the live AI/search integration. It also drafted this report and ran the new API evaluation script.
- **AI-assisted browser testing** used Playwright for the historical five cases and targeted retest. The new live evaluation uses HTTP requests, not a new browser-testing assistant run.
- **OpenAI `gpt-5-mini`** is the model inside the product's live feature. Public web search is part of those runtime requests, separate from development assistance.
- **AI Use for Final Project** I used ChatGPT to help proofread and improve my `prd-final.md` and `implementation-ethics.md` files. AI helped me organize my ideas, correct grammar, and make my writing clearer while keeping my original thoughts and experiences. I reviewed the suggestions to ensure the final documents accurately reflected my project.

### Representative actual prompts and revisions

| Recorded prompt or excerpt | What it produced | Judgment or verification |
| --- | --- | --- |
| “Fix the dress code issue: if a user enters ‘casual everyday, business casual for meetings,’ the result should reflect that. Make instructions clearer and improve how the app handles missing information.” | Occasion-specific guidance and clearer validation | Corrected the earlier single-code approach; checked the mixed-dress scenario and missing inputs |
| “Actually run the tests against the revised prototype. Do not invent results or automatically mark everything as passing.” | Historical five-case browser evidence and a targeted retest | Preserved the original failure rather than relabeling it an initial pass |
| “Add AI and web research.” | Server-side live research, consent, personalized suggestions, sources/unknowns, and explicit error handling | Kept the basic option honestly labeled; checked the real endpoint and later added the live cases and repeats in this report |

### Human judgment and corrected AI-assisted work

The user supplied the product direction and peer-feedback entries, required preservation of the existing design, and explicitly approved the move to real AI/search. The earlier AI-assisted implementation was substantially revised because one dress-code conclusion could not represent casual everyday work and business-casual meetings. Later evidence exposed another unsupported casual conclusion; the clarification safeguard corrected that specific case.


### Verification and remaining checks

This report separates real browser observations, new API output, source-link safety tests, and type/build checks. A successful HTTP response is not proof of truth or usability. The new raw evidence retains inputs, predeclared criteria, response status, timing, and complete returned guides for inspection.

Still unverified: every cited claim's factual support, broad model reliability, mobile/accessibility experience, the latest public build, remote repository upload of these new files, and the existing demo's playback/content/sharing.
