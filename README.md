[README.md](https://github.com/user-attachments/files/33138199/README.md)
# CultureFit

CultureFit helps new professionals feel a sense of belonging through company/team-informed outfit suggestions, useful question scripts, and a first-month support plan.

## First working slice

Choose **Build My Guide**, enter a role, work environment, and one to three priorities, then optionally add a **My Company & Team** brief. After a short simulated loading step, the app shows:

- **Your first-week outfit:** first-day and meeting suggestions, an alternative, and what to confirm.
- **Questions you can use:** role/priority-specific scripts with who to ask and when.
- **Your first-month plan:** three milestones with a progress checklist.

Employees can reflect, edit their answers, or start over. Missing required inputs produce helpful errors rather than an empty guide.

## Open the prototype

**Published address:** [https://Culture-fit.replit.app](https://Culture-fit.replit.app)

**Submission status:** Publishing metadata confirms a successful deployment, but its visibility is currently **private**. A signed-out request also detected an access/login gate. This is not yet a verified public prototype link. The owner must make the deployment public, confirm the current version is published, and check the address in a signed-out browser before submitting.

Once public, open the address and choose **Build My Guide**. Until then, the owner can open the **CultureFit preview** in Replit using the existing `artifacts/culturefit: web` workflow.

## AI role and prototype status

**Intended AI:** interpret an employee's role, priorities, and supplied company/team guidance to suggest realistic outfits, useful questions, and a supportive first-month plan.

- **Functional now:** intake, validation, rule-selected recommendations, company/team context, checklist progress, reflection, edit, and reset.
- **Simulated:** prepared templates and simple text cues stand in for AI-generated guidance. The roughly one-second loading step is simulated processing, not a live AI request.
- **Manual:** the employee supplies onboarding information and confirms unknown expectations with real colleagues. No hidden human operator generates the guide.

The app explicitly labels simulated AI and unverified information. It does not research a company, fully interpret arbitrary documents, or use a live AI service, accounts, or saved data. Company names alone do not establish company policies. No retention improvement is claimed or measured.

## Three test results

These three user-facing browser tests were completed on October 7, 2026 UTC (October 6 in America/Indianapolis). All passed, with no browser page or console errors captured. The unchanged app retains those results; they are not new tests run solely for this README update.

| Test | Input or action | What happened | Pass, partial, or fail |
| --- | --- | --- | --- |
| Typical case | Casey; Marketing Associate; In person; What to wear, Asking questions, and What is expected of me; Example Co / Brand team; “Our dress code is business casual. We use Slack for updates.” | Simulated loading led to a personalized guide with labeled, unverified business-casual evidence, outfit options, marketing questions with who/when, and team/Slack-aware milestones. Check/uncheck updated progress; reflection worked; editing retained answers. | Pass |
| Challenge case | Marketing Coordinator; Fully remote; Meetings, Email and chat, and Working remotely; no company/team guidance; mobile viewport 402 × 874 | Despite missing team norms, the guide showed video-call outfit suggestions, questions about meetings/channels/availability, and three milestones. It did not invent company rules, and intake/results had no horizontal overflow. | Pass |
| Invalid or empty case | Start over, reopen intake, and submit all fields blank | Stayed on intake, focused the role input, showed errors for role/environment/priorities and “Tell us a little about your new role first so we can create your guide.” No results appeared. Reset also cleared prior optional information. | Pass |

These demonstrate the flow, not real-world improvements to employee confidence or retention. A small progress-bar segment was observed during the animated return to zero; the count and checkbox state were correct. Eight separate guidance tests, type checking, and the production build also passed during implementation.

## Known limitations and next steps

1. **Simulated AI:** Templates and simple cues cannot interpret every onboarding document or role nuance. Next, evaluate representative briefs and trial grounded AI that identifies its sources and uncertainty.
2. **Unverified team information:** Employee-supplied notes can be incomplete or outdated. Next, accept reviewed, dated team guidance while keeping recommendations distinct from confirmed policy.
3. **Session-only state and unmeasured outcomes:** Refreshing loses the plan and checks; the prototype cannot demonstrate better retention. Next, run an opt-in pilot with revisitable plans and employee feedback before making outcome claims.

## Repository and submission status

The current app is in **`artifacts/culturefit`**. This root README contains the required deliverables; the longer documentation is optional supporting material:

- [Detailed app README and run instructions](artifacts/culturefit/README.md)
- [Detailed observations for the three browser tests](artifacts/culturefit/docs/rubric-test-results.md)
- [Current app source](artifacts/culturefit/src/App.tsx)
- [Guidance logic tests](artifacts/culturefit/tests/company-plan.test.ts)

**GitHub repository:** [mmacf123/practice-](https://github.com/mmacf123/practice-) is the existing public repository from Project Set-Up. This workspace is connected to that repository. Uploads use a clean current-code snapshot rather than exporting Replit checkpoint history, original uploads, or agent notes.

**Upload status:** The current code and this README are prepared locally, but the authenticated GitHub push has been rejected. The upload has not been verified as complete.

Common `.env`, credential, and private-key files are excluded by `.gitignore`, and representative ignore rules were checked. A limited check of current tracked/nonignored text files found no common secret-token or literal-credential patterns. The already-tracked `.npmrc` was checked separately and has no authentication fields or credential-bearing URLs. This is not a full secrets audit of Git history or the existing GitHub repository. Do not place secrets in source code, documentation, or commit messages; ignore rules do not protect secrets already committed in Git history.

### Remaining owner steps

1. Open the GitHub repository above and confirm the current files and root README appear on its main page. Future uploads should continue using a reviewed current-code snapshot; do not push Replit checkpoint history or overwrite existing remote work.
2. Open **Publishing** and change the app's access to **Public**. Replit's documentation says changing visibility may require unpublishing and republishing; unpublishing temporarily takes the live app offline. Review the publishing options and confirm the action yourself.
3. Open the published address in a signed-out/incognito browser and confirm the current CultureFit landing, intake, and guide are accessible without workspace access. Submit that app address alongside the public repository link.

**Canvas submission note:** “The three test results are in the ‘Three test results’ section of README.md. Current limitations and planned improvements are in ‘Known limitations and next steps.’”
