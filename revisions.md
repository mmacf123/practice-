# CultureFit

CultureFit helps new professionals feel a sense of belonging through company/team-informed outfit suggestions, useful question scripts, and a first-month support plan.

## Revised-prototype assignment

**This README is the single-file assignment document for GitHub.** It contains the feedback log, three improvements, all five tests, the before/after comparison, risk response, evaluation, priorities, AI-use disclosure, and demo speaking script. Supporting files and earlier documentation are retained, but the professor does not need to open another Markdown file to read the assignment.

| Assignment component | Where to find it |
| --- | --- |
| Peer feedback, decisions, and three improvements | [Feedback log and improvements](#feedback-log-and-improvements) |
| Five new test cases, actual results, and next improvements | [Five test cases](#five-test-cases) |
| Before-and-after comparison | [Comparison](#before-and-after-comparison) |
| Risk, safeguards, and over-reliance on AI | [Risk response](#risk-response) |
| Short evaluation and future priorities | [Evaluation](#evaluation) and [priorities](#future-priorities) |
| AI tools, actual prompts, corrections, and verification | [AI-use disclosure](#ai-use-disclosure) |
| Recorded video | [Demo Video](#demo-video)|

## First working slice

Choose **Build My Guide**, enter a role, work environment, and one to three priorities, then optionally add a **My Company & Team** brief. After a short simulated loading step, the app shows:

- **Your first-week outfit:** first-day and meeting suggestions, an alternative, and what to confirm.
- **Questions you can use:** role/priority-specific scripts with who to ask and when.
- **Your first-month plan:** three milestones with a progress checklist.

Employees can reflect, edit their answers, or start over. Missing required inputs produce helpful errors rather than an empty guide.

## Open the prototype

**Published address:** https://culture-fit.replit.app/

**Access/version check — November 16, 2026:** Publishing metadata now reports **public**, and a signed-out request returned HTTP 200 with the CultureFit page. However, the served application bundle lacked the revised “Everyday dress code” and separate meeting-guidance markers present in the current source. The public address appears to serve an older build. Republish the current version and verify the mixed-dress-code example before submitting it as the revised prototype.

Open the address and choose **Build My Guide**. The five new tests use the current revised **CultureFit preview** in Replit, not the older published build. See [revision.md](revision.md) for the exact testing setup. For local setup and run commands, see the [app README](artifacts/culturefit/README.md#run-locally).

## Demo Video

**Google Drive video link: https://drive.google.com/file/d/1Ug6dIUdhVbi2-c2ACDVilxnbWFhxZm65/view?usp=sharing **

## AI role and prototype status

**Intended AI:** interpret an employee's role, priorities, and supplied company/team guidance to suggest realistic outfits, useful questions, and a supportive first-month plan.

- **Functional now:** intake, validation, rule-selected recommendations, company/team context, checklist progress, reflection, edit, and reset.
- **Simulated:** prepared templates and simple text cues stand in for AI-generated guidance. The roughly one-second loading step is simulated processing, not a live AI request.
- **Manual:** the employee supplies onboarding information and confirms unknown expectations with real colleagues. No hidden human operator generates the guide.

The app explicitly labels simulated AI and unverified information. It does not research a company, fully interpret arbitrary documents, or use a live AI service, accounts, or saved data. Company names alone do not establish company policies. No retention improvement is claimed or measured.

## Feedback log and improvements

These are the three completed improvements documented for this assignment. The design and core features were retained; the existing everyday/meeting improvement was tested rather than rebuilt.

| Feedback or observed issue | Decision | What changed |
| --- | --- | --- |
| The outfit recommendations did not accurately reflect the dress code provided. The user specified casual everyday clothing and business casual for client meetings, but the result said no dress expectations were provided. | **Acted on** | Improved the outfit recommendations to better reflect the dress code provided in the user's input. Everyday and client-meeting guidance are now separate. Test 1 verified casual everyday advice and business-casual meeting advice. |
| The prototype was not publicly accessible, making it difficult for reviewers to test the app without logging in. | **Acted on** | Made the Replit prototype publicly accessible so reviewers can open the app and test its features without logging in. A signed-out access check confirmed the CultureFit page. **The checked public build was older than the revised source, so the current revision still needs republishing.** |
| Testing found that “dress professionally” combined with “casual clothing” was being treated as definitely casual. | **Acted on — testing observation** | Added a small safeguard that explains the ambiguity, leaves uncertain dress expectations unconfirmed, and asks what is appropriate for a normal day and client meeting. Test 3 initially failed and then passed its targeted browser retest. |

**Which feedback was used or adapted?** The first two entries were supplied by the student as feedback or observed issues. The dress-code feedback was adapted into occasion-specific guidance, not one dress code for every situation. The third entry came from actual testing, not an additional peer comment.

**Which feedback was not used?** No other peer comments or decisions to reject feedback were supplied. None are invented or claimed as rejected. Earlier clearer instructions and missing-input handling remain in the app; those originated in the student's request.

The earlier incorrect dress-code response is student-reported historical feedback; the original build was not rerun during this assignment.

## Five test cases

**Test date:** November 16, 2026, UTC. Tests used a real browser at desktop 1280 × 900 against the current revised workspace preview. The public address was checked separately and appeared to serve an older build. Do not treat these as tests of that older published version.

### Inputs and actual controls

CultureFit has a structured intake rather than a single chatbot field. For Tests 1, 2, 3, and 5, the role was **Marketing Associate**, workplace **In person**, priority **What to wear**, and everyday dress selection **Not sure yet**. The exact sentence in the table was entered in **What you already know**. All other optional fields were blank/default. Test 4 left the entire intake blank/default.

### Expected and actual results

| Test | Exact input/action | Expected result | Actual result observed in the browser | Pass / partial / fail | Next step |
| --- | --- | --- | --- | --- | --- |
| **1 — Normal request** | “I work in an office where everyday clothing is casual, but client meetings require business casual.” | Separate casual everyday clothing from business-casual client meetings. | First day: “Neat trousers, a plain top, and clean sneakers if the policy permits them.” Meetings: business-casual guidance with tailored trousers/chinos, a knit top/button-down, and loafers/flats. Why: “Everyday: casual. Meetings: business casual.” | **Pass**, with a minor presentation issue. | Preserve supporting text verbatim: the evidence excerpt dropped “, but”, although the recommendations distinguished the occasions correctly. |
| **2 — Normal request** | “I am starting a marketing job where the dress code is business casual. I want comfortable but professional outfits.” | Comfortable business-casual recommendations. | First-day advice used tailored trousers/chinos, a plain knit top/button-down, and loafers/flats. Why identified business casual for everyday work and meetings. Alternative: “An existing plain top and neat trousers work; choose a comfortable fit rather than buying a new outfit.” | **Pass**. | Test more specific comfort/accessibility preferences; this alternative is a prepared template, not full preference understanding. |
| **3 — Confusing request** | “My workplace says to dress professionally but also encourages casual clothing.” | Explain uncertainty or ask for clarification rather than concluding that the policy is casual. | **Initially:** “Based on what you shared” and casual for both occasions; “professional” was absent. **After a small safeguard, actual browser retest:** “Suggested starting point — confirm first”; meeting expectations unknown; Why named both professional and casual. Confirm asked: “When you say professional but casual, what would be an appropriate outfit for a normal workday and for a client meeting?” | **Initial fail → Pass on targeted retest.** | Evaluate other vague phrases; a generic AI disclaimer is not enough to resolve ambiguity. |
| **4 — Empty input** | Leave the entire intake blank/default and submit. | Ask for required information instead of generating unsupported advice. | No results appeared. Alert: “Add your role, choose where you work, and pick 1–3 priorities to build your guide.” Field errors: “Add your role.”, “Pick where you work.”, and “Pick at least one.” Focus moved to the role input. Errors cleared progressively as answers were corrected. | **Pass**. | Check keyboard/screen-reader users and mobile; this run was desktop-only. |
| **5 — Potentially misleading result** | “I have an important client meeting tomorrow, but I don't know the dress code.” | Do not invent a workplace dress requirement; communicate uncertainty. | Label: “Suggested starting point — confirm first”. First-day advice was tentative. Meetings: “No clear meeting dress code was supplied. Ask your manager what to wear for team and client meetings; do not assume everyday rules apply.” No policy evidence or invented requirement was shown. Edit answers retained the exact notes; replacing them with Test 1 and regenerating changed the advice appropriately. | **Pass**. | Test whether users notice and act on the warning, particularly before urgent client meetings. |

**Results:** the initial run produced four passes and one failure. The failed challenge case passed a targeted browser retest after its safeguard. All five therefore have passing final recorded outcomes, but there was **not** a second full post-change browser pass. Tests 1, 2, 4, and 5 stand as observed initially. The original failure is preserved rather than relabeled as an initial pass.

**Supporting verification:** all 20 automated guidance tests, TypeScript checking, and the production build passed after the safeguard. The existing non-blocking tooltip sourcemap warning remains. These checks are separate from the five browser cases.

Optional detailed evidence: [browser report](artifacts/culturefit/docs/five-case-browser-results.md), [Test 1 screenshot](artifacts/culturefit/docs/screenshots/test1-outfit.png), [initial Test 3 failure](artifacts/culturefit/docs/screenshots/test3-outfit.png), and [successful Test 3 retest](artifacts/culturefit/docs/screenshots/test3-followup-outfit.png).

## Before-and-after comparison

**Same input:** “I work in an office where everyday clothing is casual, but client meetings require business casual.”

| Stage | Result and evidence |
| --- | --- |
| **Before — student-reported peer feedback** | “No clear dress expectation was supplied.” This missed two useful, occasion-specific expectations. The original build was not available for a new test in this assignment. |
| **After — actual Test 1 of the revised prototype** | Everyday advice stayed casual. Meeting advice explicitly followed business casual. The explanation stated “Everyday: casual. Meetings: business casual.” |
| **Did the change fix the issue?** | **Yes, for the supplied scenario in the tested revised preview.** This does not prove that every possible policy is understood or that the older public build contains the revision. |

## Risk response

**Risk:** CultureFit could sound certain and invent a workplace dress expectation when information is missing or unclear.

**Who could be affected:** new employees, particularly those facing a client meeting or with limited time/money for clothing. Managers, coworkers, and clients could also be affected by a misunderstanding.

**What could go wrong:** a user could wear an unsuitable outfit, buy clothes unnecessarily, feel excluded or anxious, or rely on an unverified suggestion instead of checking the actual policy.

| Safeguard | Evidence |
| --- | --- |
| Required-information check | Test 4 blocked empty submission, explained missing answers, and focused the role field. |
| Honest unknown-dress guidance | Test 5 explicitly left meeting expectations unknown and labeled the first-day outfit tentative. |
| Distinguish supplied notes from verified policy | Results label suggestions and user-supplied information as unverified. No company-policy lookup occurs. |
| Edit and correct answers | Test 5 retained the original notes in Edit answers and changed the result after a correction. |
| Clarify vague professional/casual wording | After the initial Test 3 failure, a narrow local rule was added to name the uncertainty and ask what is appropriate for ordinary workdays and client meetings. Its targeted browser retest passed. |

**What was implemented:** a small rule in `artifacts/culturefit/src/dress-evidence.ts` and `company-plan.ts`, with a regression test in `tests/company-plan.test.ts`. It does not redo the everyday/meeting feature or change the design.

**Functional versus simulated:** validation, editing, labels, and clarification rules actually work. The recommendation experience and loading delay are **simulated AI**; there is no live AI safety model, live policy verification, or hidden human operator.

**Remaining risks:** English keyword rules can miss synonyms, negation, complicated handbooks, or context. Displayed evidence can drop conjunctions. Users may ignore the warning, and the app cannot verify that a manager was consulted. Safety-sensitive roles still require uniform/PPE confirmation.

**Over-reliance on AI:** personalized, fluent advice and an AI-style loading screen may seem more authoritative than the rules justify. The safeguards reduce one observed failure; they do not establish that every recommendation is safe. Confirm consequential outfit choices with a real workplace contact.

## Evaluation

The five cases support CultureFit's value as a practical starting point: it distinguished everyday and meeting dress expectations, offered a comfortable business-casual alternative, blocked an empty submission, and allowed unknown information to remain unconfirmed and editable. The professional-versus-casual challenge initially failed, but after a small safeguard its targeted browser retest named the ambiguity and requested clarification. All five have passing final outcomes, although no second full browser pass was run. Evidence quotations were not always verbatim, and mobile use and arbitrary policy interpretation remain untested. These results demonstrate prototype behavior, not improved employee confidence, belonging, or retention. Broader ambiguity evaluation, faithful quotations, and testing with actual new employees should come next.

## Future priorities

1. **Broaden clarification coverage:** evaluate words such as “smart” and “polished” and vague client-day exceptions, asking focused questions rather than guessing.
2. **Preserve source text verbatim:** separate matching rules from displayed evidence so conjunctions such as “but” are not dropped.
3. **Validate with real users and devices:** check mobile, keyboard/screen-reader use, comfort/accessibility needs, and whether employees understand the uncertainty warnings.

## AI-use disclosure

### Tools used during development

**Replit Agent** assisted with coding, debugging, interface wording, documentation, source packaging, and test preparation. This disclosure was drafted with Replit Agent and must be reviewed by the student.

The recorded work includes React/TypeScript implementation, local recommendation rules, validation, and separate everyday/meeting guidance while retaining the approved design. A browser-testing assistant used Playwright for the five actual interface cases and the targeted rerun. Playwright, Node's test runner, TypeScript, and Vite are software tools, not AI models.

**Student to complete — other AI tools personally used:** [LIST ANY OTHER TOOLS USED OUTSIDE THIS RECORDED REPLIT HISTORY, OR WRITE “NONE”]. Their use cannot be inferred from this workspace.

### Representative actual prompts

| Actual prompt or excerpt | What it produced | What was changed or checked |
| --- | --- | --- |
| “Fix the dress code issue: if a user enters ‘casual everyday, business casual for meetings,’ the result should reflect that. Make instructions clearer and improve how the app handles missing information.” | Separate everyday/meeting interpretation, clearer intake instructions, and errors that clear as answers are corrected. | The single-code approach was revised into occasion-specific rules. Tests cover mixed rules, uncertainty, missing information, remote work, and safety-sensitive roles. |
| “Prepare a downloadable ZIP of my current CultureFit project, including README.md and the code needed to run it. Exclude secrets, .env files, node_modules, and .git.” | A source archive with workspace configuration and run instructions. | Archive entries and integrity were checked. Earlier archives are not evidence of later source changes or successful GitHub upload; use the refreshed assignment package. |
| “Actually run the tests against the revised prototype. Do not invent results or automatically mark everything as passing.” | Five browser cases and assignment documentation. | The initial four passes and one failure were recorded. The failed case was corrected with a small safeguard and actually rerun. The historical three-case report was retained separately, not relabeled as new testing. |

These are recorded requests or excerpts, not invented representative prompts.

### One AI-assisted approach corrected

The earlier AI-assisted implementation reduced supplied dress guidance to a single dress code. That was inadequate when everyday work and client meetings differed. Student-reported peer feedback identified the “No clear dress expectation was supplied” response, and the user explicitly required both occasions to be reflected.

The approach was substantially revised into separate everyday/meeting rules. The everyday dropdown can coexist with meeting-specific notes; unknown or conflicting expectations stay unconfirmed. Later, the five-case evaluation exposed a further vague professional/casual failure, which was corrected with the narrow clarification safeguard. Neither correction was a redesign. The historical “before” response was not independently rerun.

### Verification and remaining checks

- All 20 automated guidance tests, TypeScript checking, and the production build passed after the latest safeguard.
- Five actual browser cases initially produced four passes and one failure; only the failed case was rerun after its fix and passed. The original failure and screenshots are retained.
- Tests checked behavior, validation, editing, and uncertainty labels, not real-world gains in confidence, belonging, or retention.
- A public URL does not prove that the latest source is deployed. The checked public build was older than the revised workspace source.
- A connected GitHub account or local document does not prove a successful repository upload.
- The student must review this disclosure, complete the personal AI-tools field, record/upload the demo, add the video link, and check final submission access.

### What AI does inside CultureFit

The app uses **simulated AI only**, with no live language model, company-policy browsing, or hidden human operator.

**Inputs:** role, workplace environment, selected priorities, optional company/team details, an everyday dress-code selection, and onboarding notes.

**Processing:** local TypeScript rules identify a limited set of clothing and occasion cues and choose prepared suggestions. The roughly one-second loading screen is simulated processing, not an AI request.

**Outputs:** everyday/first-day and meeting outfit advice, alternatives, explanations and confirmation questions, question scripts with who/when, and a first-month checklist.

Supplied information is labeled unverified. The simple rules may miss meaning; personalized wording should not be treated as authoritative company policy.
  
## Three test results

**Earlier assignment:** these are not the five cases for the new assignment. Use [Five test cases in this README](#five-test-cases) for the revised-prototype assignment.

These three user-facing browser tests were completed on October 7, 2026 UTC (October 6 in America/Indianapolis). All passed at that time, with no browser page or console errors captured. They predate the latest dress-code and form-instruction fixes; the observations below are historical, not a new browser pass.

| Test | Input or action | What happened | Pass, partial, or fail |
| --- | --- | --- | --- |
| Typical case | Casey; Marketing Associate; In person; What to wear, Asking questions, and What is expected of me; Example Co / Brand team; “Our dress code is business casual. We use Slack for updates.” | Simulated loading led to a personalized guide with labeled, unverified business-casual evidence, outfit options, marketing questions with who/when, and team/Slack-aware milestones. Check/uncheck updated progress; reflection worked; editing retained answers. | Pass |
| Challenge case | Marketing Coordinator; Fully remote; Meetings, Email and chat, and Working remotely; no company/team guidance; mobile viewport 402 × 874 | Despite missing team norms, the guide showed video-call outfit suggestions, questions about meetings/channels/availability, and three milestones. It did not invent company rules, and intake/results had no horizontal overflow. | Pass |
| Invalid or empty case | Start over, reopen intake, and submit all fields blank | Stayed on intake, focused the role input, showed errors for role/environment/priorities and “Tell us a little about your new role first so we can create your guide.” No results appeared. Reset also cleared prior optional information. | Pass |

These demonstrate the flow, not real-world improvements to employee confidence or retention. A small progress-bar segment was observed during the animated return to zero; the count and checkbox state were correct. Eight separate guidance tests, type checking, and the production build also passed during implementation.

**Previous-revision regression checks:** All 19 automated guidance tests, type checking, and the production build passed. Tests cover “casual everyday, business casual for meetings,” missing everyday/meeting guidance, uncertain or conflicting notes, remote and safety cases, and required-field corrections. Form instructions now explain what is required and what can be skipped; error highlights clear as answers are corrected.

**Next-assignment update:** The new five-case browser evaluation initially found four passes and one failure. A narrow professional/casual uncertainty guard was added; the failed case passed its targeted browser retest. All 20 automated regression tests, type checking, and the production build passed after that guard. See [revision.md](revision.md) for final results and retained failure evidence.

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

**Repository check — November 16, 2026:** The repository is public and contains a root README and a `culturefit/` folder. The new `revision.md`, `ai-use-disclosure.md`, and `demo-script.md` were not present when checked. Prior command-line pushes were rejected; the current authorized API connection did not expose usable execution credentials. A local document or connected account is not proof of a completed GitHub upload. The new materials must be uploaded and checked on GitHub before submission.

Common `.env`, credential, and private-key files are excluded by `.gitignore`, and representative ignore rules were checked. A limited check of current tracked/nonignored text files found no common secret-token or literal-credential patterns. The already-tracked `.npmrc` was checked separately and has no authentication fields or credential-bearing URLs. This is not a full secrets audit of Git history or the existing GitHub repository. Do not place secrets in source code, documentation, or commit messages; ignore rules do not protect secrets already committed in Git history.

