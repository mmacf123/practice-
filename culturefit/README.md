# CultureFit

**A small workplace-onboarding prototype that helps new professionals feel a sense of belonging.**

The job to be done: help an employee choose what to wear confidently, ask useful questions without feeling embarrassed, and get the clarity and support they need during their first month.

The concept may also help employers support retention. This prototype does **not** measure or guarantee retention, and it does not encourage employees to stay in an unsupportive workplace.

## Rubric checklist

The [root README](../../README.md) is the concise submission document and contains the required three-result table directly. This longer README provides supporting implementation detail.

| Category | Where to find the evidence |
|---|---|
| Prototype Flow — 40 pts | The walkthrough below and the input → loading → guide experience in the app |
| AI Role and Transparency — 15 pts | The functional / simulated / manual breakdown below; disclosures in loading and results |
| Three Test Cases — 20 pts | The browser test report in [docs/rubric-test-results.md](docs/rubric-test-results.md) |
| Known Limitations — 15 pts | Three specific limitations and next steps below |
| Repository and README — 10 pts | Source map, run instructions, and submission-access checklist below |

## 1. Prototype flow

**One clear task:** turn information about a new role and team into a practical first-month guide.

1. On the landing page, choose **Build My Guide**.
2. Enter the three required answers: role, work environment, and one to three priorities.
3. Optionally add a first name, workplace type, experience, and **My Company & Team** brief: company, team, dress expectations, and a welcome-email or onboarding excerpt with private information removed.
4. Choose **Build my guide**. A roughly one-second loading screen explicitly identifies simulated AI.
5. Read the visible results in three distinct sections:
   - **Your first-week outfit:** first-day and meeting suggestions, an alternative, the reasoning, and a specific confirmation question.
   - **Questions you can use:** role/priority-specific scripts, who to ask, and when.
   - **Your first-month plan:** week-one, week-two, and day-30 milestones with a clickable progress checklist.
6. Optionally reflect using **Comfortable**, **Mixed**, or **Not yet** to see a follow-up suggestion. **Edit answers** keeps the entered information; **Start over** clears it.

Company/team names personalize the guide's context. They are not used to invent company policies. The brief is displayed as information supplied by the employee, separate from recommendations.

## 2. AI role and transparency

**Intended AI role:** interpret role, environment, employee priorities, and team-provided context to help produce grounded outfit advice, useful question scripts, and an actionable settling-in plan.

**Current implementation:** no live AI model or external company research is used.

| Status | What happens in this prototype |
|---|---|
| **Functional** | Inputs and validation work; local rules choose recommendations; company/team context appears in results; checklist progress, reflection, edit, and reset work. |
| **Simulated / Wizard-of-Oz-style** | Prepared templates and conditional rules stand in for an AI-generated guide. The loading delay represents a future AI-processing step; it is not an API call. |
| **Manual** | The employee supplies the company/team brief and confirms unknown expectations with a real manager, onboarding contact, or teammate. No hidden human operator generates the results. |

The app labels loading/results as simulated AI and identifies supplied guidance as **not verified**. The expandable explanation describes how suggestions were built.

Short, unambiguous dress-code cues and mentions of Slack/Teams can change the recommendations. This is **not full document understanding**. Unknown, negated, or conflicting dress guidance stays unconfirmed; an explicit dress selection takes precedence. Safety-sensitive roles receive uniform/PPE confirmation rather than generic office outfit advice.

## 3. Three completed test cases

See [the test report](docs/rubric-test-results.md) for the typical company-brief scenario, remote-work scenario, and empty-input scenario, including inputs, actions, observed results, and outcomes.

Separate from those browser scenarios, all eight automated guidance tests passed during the company-plan implementation. They cover optional company information, contextual personalization, no fabricated policies from a company name, negated/conflicting dress guidance, dress selections, remote/safety advice, all selected priorities, and role-specific questions.

Type checking and the production build also passed during that implementation. The build reports a non-blocking sourcemap warning from the scaffold's tooltip component.

## 4. Known limitations and realistic next steps

| Limitation | Why it matters | Realistic next step |
|---|---|---|
| **Simulated AI with limited context interpretation** | Templates and simple cues cannot interpret arbitrary onboarding text or every role nuance. | First evaluate representative briefs with employees; then trial grounded AI interpretation that quotes its source and preserves uncertainty. |
| **Unverified company/team information** | Employee-supplied notes may be incomplete, outdated, or different from official policy. | Let a team provide a reviewed, dated onboarding brief; continue distinguishing supplied information from recommendations and asking about unclear requirements. |
| **Session-only state and no long-term outcome evidence** | Refreshing loses inputs/checks; this prototype cannot demonstrate improved belonging or retention over time. | In a later opt-in pilot, allow employees to revisit their plan and gather feedback at agreed check-ins before making any retention claim. |

These are future steps, not features included in this submission.

## 5. Repository, running, and submission access

### Source map

- `src/App.tsx` — landing, intake, loading, guide, checklist, and reflection.
- `src/company-plan.ts` — company-brief cues, outfit suggestions, question scripts, and milestones.
- `src/guide.ts` — intake options, validation, guide assembly, and reflection rules.
- `src/index.css` — responsive styling.
- `tests/company-plan.test.ts` — automated guidance tests.
- `docs/rubric-test-results.md` — the three browser test cases and their observations.

CultureFit is a client-only React/Vite prototype inside this pnpm workspace. It does not use the workspace's shared API/database service, accounts, or a live AI integration.

### Run locally

From the repository root, using the installed Node.js/pnpm toolchain:

```sh
pnpm install
PORT=18754 BASE_PATH=/ pnpm --filter @workspace/culturefit run dev
```

In Replit, use the existing **artifacts/culturefit: web** workflow and the CultureFit preview. There is no need to create a second web workflow.

### Verify

```sh
pnpm --filter @workspace/culturefit run typecheck
PORT=18754 BASE_PATH=/ pnpm --filter @workspace/culturefit run build
pnpm --filter @workspace/culturefit exec tsc tests/company-plan.test.ts --outDir /tmp/culturefit-plan-tests --module commonjs --target es2022 --esModuleInterop --skipLibCheck --moduleResolution node --types node
node --test /tmp/culturefit-plan-tests/tests/company-plan.test.js
```

### Submission-access checklist

- Submit a project/repository link that allows the instructor to open the current source and this README.
- For a private Replit project, grant the instructor appropriate access using the project's sharing controls. Do not assume a preview link grants source access.
- Confirm access from the instructor's account or an appropriately signed-out session.
- If a separate runnable app link is required, include it alongside the source link.

**Access status:** this workspace is connected to the existing public [mmacf123/practice- repository](https://github.com/mmacf123/practice-). Publishing metadata confirms a successful deployment at https://Culture-fit.replit.app, but it is private and a signed-out request detects an access/login gate. See the [root README](../../README.md) for the public-prototype submission steps.
