[revision.md](https://github.com/user-attachments/files/34981990/revision.md)
# CultureFit — revised-prototype evaluation

**Historical evaluation:** this report records the November 16 local-rule prototype. A later upgrade added optional live AI/web research; the original behavior remains available in **Basic guide · no web**. These five browser results were not rerun or relabeled as live-AI results. See the root README for current functionality.

## Scope and tested version

This assignment evaluates the existing CultureFit prototype. The design, core flow, and earlier everyday/meeting dress-code revision were retained. One small uncertainty safeguard was added after the new tests exposed a risk; this is described below, not presented as a rebuild.

**Test date:** November 16, 2026, UTC. **Method:** actual browser interaction at desktop 1280 × 900, followed by a targeted rerun of the failed challenge case. The full initial report, output quotations, and screenshot filenames are in [the browser evidence](artifacts/culturefit/docs/five-case-browser-results.md).

**Tested application:** the current revised [workspace preview](https://30e3ee6c-9e32-41c0-a119-a4e1984daec2-00-3c31s4sraewjs.worf.replit.dev/). This development address is not a stable public submission link. The [published address](https://Culture-fit.replit.app) is publicly reachable, but its served bundle was checked and appears older than the current revision. The five-case results must not be represented as a test of that older published build.

Demo: https://drive.google.com/file/d/1Ug6dIUdhVbi2-c2ACDVilxnbWFhxZm65/view?usp=sharing 

Replit: https://Culture-fit.replit.app 

## Peer feedback and response

| Feedback or observed issue | Decision | What changed |
| --- | --- | --- |
| The outfit recommendations did not accurately reflect the dress code provided. The user specified casual everyday clothing and business casual for client meetings, but the result said no dress expectations were provided. | **Acted on** | Improved the outfit recommendations to better reflect the dress code provided in the user's input, keeping everyday and client-meeting guidance separate. Test 1 verified this distinction. |
| The prototype was not publicly accessible, making it difficult for reviewers to test the app without logging in. | **Acted on** | Made the Replit prototype publicly accessible so reviewers can open the app without logging in. A signed-out access check confirmed the public CultureFit page. The checked public build was older than the revised source, so access and version verification remain separate. |
| During testing, “dress professionally” combined with “casual clothing” was treated as a definite casual rule. | **Acted on — testing observation** | Added a small uncertainty safeguard that names the ambiguity and asks what is appropriate for normal workdays and client meetings. Test 3 initially failed and then passed its targeted browser retest. |

**Feedback sources and decisions:** The first two issues above were supplied by the student as feedback or observed issues. The third came from actual browser testing. The dress-code feedback was adapted into separate everyday/meeting guidance, rather than choosing one rule for every occasion. No additional peer comments or rejected feedback were supplied, so none are invented or claimed as rejected. Earlier clearer instructions and missing-input handling also remain in the app; those originated in the student's request.

**Feedback supplied by the student:** when everyday clothes were casual and client meetings required business casual, the earlier prototype responded, “No clear dress expectation was supplied.”

**Response already implemented before this assignment:** keep everyday and meeting expectations separate, use meeting-specific notes rather than flattening everything into one dress code, and make required/optional instructions clearer. This assignment did not redo that improvement.

The student-reported feedback is historical evidence, not a claim that the original build was available or rerun today.

## Five test cases

### How the prose inputs map to actual controls

CultureFit has a structured intake, not a single chat box. For Tests 1, 2, 3, and 5:

- Role: **Marketing Associate**.
- Workplace: **In person**.
- Priority: **What to wear**.
- Everyday dress-code selection: **Not sure yet**.
- Paste the exact test sentence into **What you already know**.
- Leave all other optional inputs blank/default.
- Generate the guide and inspect First day, Meetings, Alternative, Why, Confirm, evidence, and uncertainty labels.

Test 4 leaves **all** inputs blank/default, including role, workplace, priorities, and notes.

### Results and next improvements

| Test | Exact input/action | Expected result | Actual result observed in the browser | Result | What should improve next |
| --- | --- | --- | --- | --- | --- |
| **1 — Typical** | “I work in an office where everyday clothing is casual, but client meetings require business casual.” | Recognize casual everyday clothing and business casual for meetings separately. | First day: “Neat trousers, a plain top, and clean sneakers if the policy permits them.” Meetings: business-casual guidance with tailored trousers/chinos, a knit top/button-down, and loafers/flats. Why: “Everyday: casual. Meetings: business casual.” | **Pass**, with a minor presentation issue. | Display supporting text verbatim: the evidence excerpt dropped “, but”, although the recommendations distinguished the two occasions correctly. |
| **2 — Typical** | “I am starting a marketing job where the dress code is business casual. I want comfortable but professional outfits.” | Comfortable business-casual recommendations. | First day: tailored trousers/chinos, a plain knit top/button-down, and loafers/flats. Why identified business casual for everyday work and meetings. Alternative: “An existing plain top and neat trousers work; choose a comfortable fit rather than buying a new outfit.” | **Pass**. | Test more specific comfort/accessibility preferences; this comfortable alternative is a prepared template, not evidence of full preference understanding. |
| **3 — Challenge** | “My workplace says to dress professionally but also encourages casual clothing.” | Explain the ambiguity or request clarification, without silently treating it as a definite casual policy. | **Initial run:** labeled “Based on what you shared” and recommended casual for both occasions; “professional” was absent. **After the small guard, actual browser retest:** “Suggested starting point — confirm first”; meeting expectations unknown; Why said both professional and casual can mean different things. Confirm asked: “When you say professional but casual, what would be an appropriate outfit for a normal workday and for a client meeting?” | **Initial fail → Pass on targeted retest.** | Broaden and evaluate ambiguity handling beyond the exact professional/casual pattern; do not treat a generic AI disclaimer as sufficient clarification. |
| **4 — Invalid/empty** | Leave the entire intake blank/default and submit. | Ask for required information; do not generate unsupported recommendations. | No results appeared. Alert: “Add your role, choose where you work, and pick 1–3 priorities to build your guide.” Field errors were “Add your role.”, “Pick where you work.”, and “Pick at least one.” Focus moved to the role input. Errors cleared progressively as the answers were corrected. | **Pass**. | Check the same validation flow with keyboard and screen-reader users and on mobile; this pass was desktop-only. |
| **5 — Risk** | “I have an important client meeting tomorrow, but I don't know the dress code.” | Do not invent a dress requirement; communicate uncertainty. | Label: “Suggested starting point — confirm first”. First-day advice was expressly tentative. Meetings: “No clear meeting dress code was supplied. Ask your manager what to wear for team and client meetings; do not assume everyday rules apply.” No policy evidence or invented requirement was shown. Edit answers retained the exact notes; replacing them with Test 1 and regenerating produced distinct advice. | **Pass**. | Test whether users actually notice and follow the confirmation advice, especially before urgent client meetings. |

**Initial totals:** four passes and one failure. **Final recorded outcomes:** all five cases met their criteria after Test 3 passed its targeted browser retest. The original failure and screenshot are preserved; a fix is not retroactively treated as an initial pass. Only Test 3 was rerun after its safeguard, not an unreported second full pass. Tests 1, 2, 4, and 5 stand as observed in the initial run; the 20-test automated suite also passed after the guard.

**Screenshot evidence:** [Test 1](artifacts/culturefit/docs/screenshots/test1-outfit.png), [Test 2](artifacts/culturefit/docs/screenshots/test2-outfit.png), [Test 3 initial failure](artifacts/culturefit/docs/screenshots/test3-outfit.png), [Test 3 successful retest](artifacts/culturefit/docs/screenshots/test3-followup-outfit.png), [Test 4](artifacts/culturefit/docs/screenshots/test4-empty.png), [Test 5](artifacts/culturefit/docs/screenshots/test5-outfit.png), and [editing Test 5 into Test 1](artifacts/culturefit/docs/screenshots/test5-edited-test1-outfit.png).

## Before-and-after comparison

**Scenario:** everyday clothing is casual, but client meetings require business casual.

| Stage | Evidence and outcome |
| --- | --- |
| **Before — student-reported peer feedback** | “No clear dress expectation was supplied.” This missed two useful, occasion-specific rules. The original build was not rerun in this assignment. |
| **Revision made before this assignment** | Existing rules were changed to represent everyday and meeting expectations separately. |
| **After — actual Test 1** | Everyday outfit remained casual; meeting advice explicitly followed business casual. The explanation stated “Everyday: casual. Meetings: business casual.” |
| **Did it fix the reported problem?** | **Yes, for the exact supplied scenario tested in the current preview.** This does not prove reliable interpretation of every dress policy or that the older published build contains the fix. |

## Risk response

### Who could be affected and what could go wrong

New employees, particularly those with an upcoming client meeting or limited money/time for clothing, could mistake a plausible suggestion for a confirmed workplace requirement. They could arrive in an unsuitable outfit, spend unnecessarily, feel excluded, or be more anxious. Coworkers, clients, and managers may also be affected by a misunderstanding.

### Safeguards checked and the small change made

| Protection | Actual evidence |
| --- | --- |
| Recognize missing required information | Test 4 blocked submission, explained missing answers, and focused the role field. |
| Recognize unknown dress expectations | Test 5 labeled the outfit a tentative starting point, expressly left meeting expectations unknown, and asked the user to confirm. |
| Avoid inventing a company policy | No live company lookup occurs. Labels distinguish suggestions and supplied information from verified policy. Tests 1 and 5 showed that distinction; it is not a guarantee for all inputs. |
| Allow correction | Test 5 retained the user's notes in Edit answers and produced different guidance after correction. |
| Address unclear professional/casual wording | The initial Test 3 exposed a gap. The added **functional, deterministic rule** keeps vague professional-plus-casual wording unconfirmed unless explicit business-casual/formal guidance disambiguates it. It explains that the terms can mean different things and asks what is appropriate for normal days and client meetings. |

The added safeguard is in `artifacts/culturefit/src/dress-evidence.ts` and `company-plan.ts`. A new regression case was added to `tests/company-plan.test.ts`. **All 20 automated tests, TypeScript checking, and the production build passed** after this change; the existing non-blocking tooltip sourcemap warning remains. The earlier everyday/meeting improvement and UI layout were not rebuilt.

**Simulation disclosure:** recommendations and the loading delay simulate a future AI experience. Input validation, uncertainty labels, editing, and the new clarification rule are real working prototype behavior, not a live AI safety model or verified company-policy service.

### Remaining risk and over-reliance on AI

The guard is narrow, English keyword matching; it cannot interpret every synonym, negation, long handbook, or context-dependent rule. The evidence excerpt may omit conjunctions because matching clauses are joined for display. A user may still over-trust the personal wording or “AI” framing and ignore a warning. Nothing checks whether the user actually consulted a manager. Safety-sensitive roles still require confirmation of uniform/PPE policies.

The safeguard reduces one observed misleading output. It does not establish that every uncertain recommendation is safe. Users should confirm consequential outfit choices with a real workplace contact.

## Evaluation

The five cases support CultureFit's value as a practical starting point: it distinguished everyday and meeting dress expectations, offered a comfortable business-casual alternative, blocked an empty submission, and allowed unknown information to remain unconfirmed and editable. The professional-versus-casual challenge initially failed, but after a small safeguard its targeted browser retest explicitly named the ambiguity and asked for clarification. All five cases therefore have passing final outcomes, though there was no second full post-change browser pass. The evidence excerpt was not always verbatim, and mobile use and arbitrary policy interpretation remain untested. These results demonstrate prototype behavior, not improved employee confidence, belonging, or retention. Broader ambiguity evaluation, faithful quotations, and testing with actual new employees should come next.

## Future priorities

1. **Broaden clarification coverage.** Evaluate phrases such as “smart”, “polished”, and vague client-day exceptions, with focused clarification rather than confident guesses.
2. **Preserve evidence verbatim.** Keep rule matching separate from source display so words such as “but” are not dropped from the quoted guidance.
3. **Validate with real users and devices.** Check mobile, keyboard/screen-reader use, comfort/accessibility needs, and whether new employees understand and act on the uncertainty warnings.
