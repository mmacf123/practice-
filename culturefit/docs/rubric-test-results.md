# CultureFit — three completed test cases

**Test date:** October 7, 2026 (UTC; October 6 in America/Indianapolis).

**Method:** One real-browser verification pass through the current CultureFit onboarding journey at the root preview (`/`). Tests used the actual controls, not just calls to the guidance functions. Desktop viewport: 1280 × 900. Mobile viewport: 402 × 874.

**Overall result:** All three scenarios passed. No browser page errors or console errors were captured.

These checks demonstrate the prototype's behavior. They are not employee research and do not prove improved confidence, belonging, or retention.

## Case 1: Typical employee with a company/team brief — PASS

### Input

- First name: Casey
- Role: Marketing Associate
- Environment: In person
- Priorities: What to wear, Asking questions, What is expected of me
- Company: Example Co
- Team: Brand team
- Dress-code selection: Not sure yet
- Supplied context: “Our dress code is business casual. We use Slack for updates.”

### Actions

Opened **Build My Guide**, entered the information, and generated the guide. Checked and unchecked the first milestone, selected **Mixed** for reflection, then used **Edit answers**.

### Expected result

A visible personalized guide, business-casual outfit suggestions tied to supplied context, marketing-specific question scripts, first-month milestones, working checklist/reflection, and retained answers when editing.

### What actually happened

- The loading screen displayed “Warming up your first-week guide...” and “Simulated AI, one moment.” before showing results.
- The guide identified Casey and **Example Co · Brand team**.
- The outfit section used the supplied business-casual excerpt as **unverified** evidence and suggested trousers/chinos.
- The marketing question asked about audience, desired action, and the result that matters most. Questions included who to ask and when.
- Milestones referenced the Brand team, Slack, and a day-30 check-in.
- Checking the first milestone changed **0 of 3 done** to **1 of 3 done**; unchecking returned it to **0 of 3 done**.
- **Mixed** displayed a follow-up suggestion about asking someone what to wear that week.
- **Edit answers** retained the company, team, dress selection, and exact context.

**Outcome: PASS.** The input-to-result journey and the exercised follow-up controls worked.

## Case 2: Remote employee without company details — PASS

### Input

- Role: Marketing Coordinator
- Environment: Fully remote
- Priorities: Meetings, Email and chat, Working remotely
- Company, team, and context: left empty
- Viewport: mobile, 402 × 874

### Actions

Used the brand-home reset, opened intake again, entered the remote-work information, and generated the guide.

### Expected result

Remote-appropriate guidance without invented company rules; questions for all three priorities; a first-month plan; usable mobile layout.

### What actually happened

- The guide suggested an outfit for video calls rather than claiming an office dress code.
- It explicitly said the team's real norms were unknown and did not invent a company or dress rules.
- Question scripts addressed meeting preparation, channels/time-sensitive updates, and availability/response times.
- Each script included who to ask and when.
- The plan showed **Week 1**, **Week 2**, and a **day-30** milestone.
- No horizontal overflow was observed in intake or results: document scroll width was 387px against the 402px viewport.

**Outcome: PASS.** The app handled missing optional context and produced remote-specific guidance.

## Case 3: Empty-input validation — PASS

### Input

All fields left blank; no environment or priorities selected.

### Actions

Selected **Start over**, reopened intake, and submitted without entering answers.

### Expected result

No guide generation; stay on intake, focus the role input, and clearly explain what is missing.

### What actually happened

- **Start over** returned to landing. Reopened intake had empty company, team, and context fields.
- Submitting blank stayed on intake and focused the role field.
- The exact alert appeared: **“Tell us a little about your new role first so we can create your guide.”**
- Inline errors appeared for role (**“Add your role.”**), workplace (**“Pick where you work.”**), and priorities (**“Pick at least one.”**).
- No results appeared.

**Outcome: PASS.** Validation blocked empty submission and helped the user correct it.

## Additional observations

- Brand-home reset and **Start over** cleared the prior optional company information between scenarios.
- Screenshots were captured during the browser verification session; they were not exported as image files into this repository. The observations above are the repository's persistent test record.
- A short orange segment was visible in a screenshot of the progress bar just after returning to zero. The displayed count and checkbox state were correct. This did not block the task; the bar uses an animated transition.
- The separate eight-test guidance suite, TypeScript check, and production build passed during the company-plan implementation. Those checks supplement—not replace—the three browser cases above.
