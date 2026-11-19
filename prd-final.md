# CultureFit — Final Product Requirements Document

## 1. Problem and primary user

Starting a new job involves unwritten expectations: what to wear, how to behave in meetings, what questions to ask, and how to communicate with teammates. These details can be missing from formal onboarding. **CultureFit** helps new employees turn uncertainty into practical first-month actions. Its primary user is a young professional starting a role; career-changing parents and returning veterans are potential later audiences, not validated user groups. The intended benefit is feeling more prepared, **not** a proven improvement in belonging or retention.

**Product thesis:** Turn a new hire’s role, setting, priorities, and available workplace notes into a useful starting guide, while being explicit about what the app does not know.

## 2. Central experience

1. The user selects **Build My Guide** and enters a **role**, **work setting**, and **one to three priorities**. Company/team information, a dress-code selection, and free-text notes are optional.
2. CultureFit checks required fields. A local rules-and-template system selects a guide after a short **simulated** processing animation.
3. The result includes **everyday and meeting outfit suggestions**, **questions to ask coworkers or managers**, and **three first-month milestones**.
4. The user can check off actions, reflect, **edit inputs and regenerate**, or confirm an unknown company rule with a person.

For example, a user may say everyday dress is casual but client meetings are business casual. The revised prototype distinguishes those two occasions rather than treating the office as having one dress code.

## 3. Features and status

| Capability | Status at checkpoint | What is available |
|---|---|---|
| Role, setting, goals and team-note intake | **Functional** | Required-field validation and optional context. |
| **Learn the Expectations** | **Functional UI; simulated AI** | Prepared outfit/meeting suggestions; uncertainty cues when a rule is unknown. |
| **Personalized Work Plan** | **Functional UI; simulated AI** | Questions to ask, three milestones, editable inputs and checklist progress. |
| **Workplace Alignment Check-In** | **Partial** | Reflection, not an independently measured cultural-fit score. |
| Clarification for conflicting dress descriptions | **Functional, limited** | Flags one tested professional/casual conflict for confirmation. |
| Live generative AI, web research and company-policy citations | **Planned only** | No model request or live policy lookup in the checkpoint prototype. |
| Account or lasting saved history | **Not implemented** | Progress is not a persistent employee account. |

## 4. AI role, value and user control

**Intended task:** Interpret variable role and workplace information and turn it into contextual, actionable suggestions. **Inputs:** role, work setting, priorities, optional team/company brief, dress selection, and notes. **Outputs:** outfit ideas, explanations, clarification prompts, questions, and a short action plan. The AI-like step sits between intake and guide generation.

**Current implementation:** local TypeScript rules select **prepared recommendations**. The loading animation is simulated; the checkpoint does **not** call a live language model. This demonstrates the intended interaction and usefulness of sample outputs, not model accuracy. In a future version, grounded AI could handle varied wording and contradictions more flexibly than fixed rules. Search alone cannot establish a team’s unwritten norms, and a template alone cannot account for every context. Those potential AI advantages remain untested.

**User control:** People can review and edit details, regenerate the guide, and reject advice. CultureFit should never describe a guess as verified company policy; the user should confirm uncertain dress, uniform, or safety requirements with an employer.

## 5. Implementation overview

```text
React/TypeScript web form → input checks → local cue matching
+ prepared templates (simulated AI) → personalized guide
→ checklist, reflection, edits, human confirmation
```

The Replit project includes local recommendation logic and test code (including `dress-evidence.ts`, `company-plan.ts`, and `company-plan.test.ts`). No verified employer database, live company lookup, or external generative-model service was documented for the checkpoint.

## 6. Evidence and decisions

The https://github.com/mmacf123/practice-/blob/main/revisions.md recorded **five browser tests**: **four initially passed and one failed**; the failure passed a targeted retest after a change. A complete second five-test browser run was not reported. This evidence led to three decisions:

- **Keep occasion-specific guidance.** Peer feedback exposed a failure to distinguish casual everyday wear from business-casual client meetings. The revised result handled both.
- **Ask rather than guess.** A “professional”/“casual” conflict initially produced an overconfident answer. A targeted clarification improved that case; unknown client-meeting attire remained unverified.
- **Preserve user control.** Empty inputs were blocked, and revising notes could change recommendations.

https://github.com/mmacf123/practice-/blob/main/README.md

## 7. Limits and next priority

Rules may miss unfamiliar language or contradictory policies. Team-specific guidance depends on user-provided information, accessibility testing is incomplete, and the published app may differ from the tested workspace. Before final submission, **verify the deployed Replit version**. If continuing, first test with real new hires and broader ambiguous inputs; then evaluate whether a source-aware live AI upgrade provides value without misrepresenting company rules.
