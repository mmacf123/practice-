# CultureFit — Implementation and Ethics Reflection

## Product judgment and priorities

I chose CultureFit because starting a new job involves more than learning official responsibilities. New employees also try to figure out unwritten expectations—what to wear, how to act in meetings, who to ask for help, and how to establish credibility. My initial idea was that CultureFit could explain a team's culture. Building the prototype showed me a major limitation: a company name does not tell the app what that particular team expects. I narrowed the product to something useful and supportable: a first-month guide based on information the employee provides.

I prioritized one complete journey over more features. Users enter a role, work setting, and priorities; receive outfit suggestions, questions to ask, and first-month milestones; and can edit their information or check off actions. The aim is to reduce guessing while leaving final decisions with the employee and their manager. I did not try to build a full HR onboarding platform or claim that the app could verify company policies.

## Building with AI and exercising judgment

Replit Agent supported coding, interface changes, rule development and debugging. ChatGPT supported design exploration, feature wording and drafting project documentation. AI tools made iteration faster, but their suggestions still needed review. **The app itself currently uses prepared recommendations selected by local TypeScript rules; it does not use live generative AI.** A loading animation simulates that intended future step. This distinction matters because testing a prepared response does not establish the accuracy of a language model.

A concrete decision came from dress-code feedback. An earlier response failed to distinguish casual everyday dress from business-casual client meetings. I chose to revise that logic rather than accept a plausible-sounding but unhelpful answer. In another test, the phrases “professional” and “casual” produced too-confident advice. A clarification safeguard was added, and that targeted retest passed. I learned to treat AI-assisted output as something to question, not automatically accept.

## Risk 1: Misleading workplace guidance

CultureFit could give someone a confident answer about a dress code or communication practice that is actually wrong. A new hire might buy unnecessary clothes, feel embarrassed in front of coworkers, or disregard required safety attire. The risk is higher when a user has little prior workplace experience or limited money for clothing. A pleasant design can make unsupported guidance appear more authoritative than it is.

The checkpoint prototype reduces this risk through required-field checks, uncertainty wording, user-editable notes, and prompts to confirm unknown rules with a manager or official policy. The professional/casual clarification was a specific response to an observed failure. In the five-case evaluation, four tests initially passed and one failed; the failing case passed a targeted retest, but the entire suite was not rerun in the browser afterward. These safeguards are useful for tested situations, yet local cue matching can still miss negation, unfamiliar language, or complicated rules. An employee must be able to disagree with the recommendation.

## Risk 2: Privacy and unfair assumptions

A user could paste internal workplace information or personal comments from coworkers into CultureFit. The checkpoint has no documented live model connection or durable user accounts, but that alone does not prove complete privacy protection. A later system that stores profiles or sends notes to a model provider would require informed consent, clear retention rules, minimal collection, and a way to delete information.

CultureFit also risks assuming that one version of “professional” dress fits everyone. Norms vary across roles, cultures, budgets, disabilities, gender expression, and remote or client-facing work. Suggestions that assume users must purchase new items can exclude people. I would prioritize guidance that respects what users already own, makes the setting clear, and invites correction. These fairness and accessibility concerns were **not fully evaluated** by the existing five tests.

## Two course connections

**1. Iterative prototyping and evidence-based product decisions.** The initial feedback and test failure led to changes in the recommendation logic rather than cosmetic additions. I saw that a working interface is not proof of a reliable product. The evidence supports particular tasks and example outputs, but not claims of improved retention, confidence, or belonging.

**2. Human-in-the-loop design and calibrated trust.** CultureFit should help a person make a decision without pretending to replace the people who know their workplace. Editing inputs, seeing uncertainty, and confirming policies with managers keep the user in control. A future model would need to distinguish employer-published information, user-supplied notes, and general suggestions, with clear sources and limits.

## Entrepreneurial learning and next step

This project reinforced that building more technology is not always the most valuable next step. My initial excitement centered on generating highly tailored advice, but testing showed that **clearer distinctions and honest uncertainty** mattered more. If I continued CultureFit, I would run a small pilot with actual new employees to see whether they understand the guidance, find it useful, and trust it appropriately before adding a live, source-aware AI model.

That lesson also applies to my ESTEEM capstone researching a proposed Skills Savings Account: a plausible product concept is different from evidence that people need, understand, and will use it. In both projects, interviews and focused testing should shape the product before technical scope expands. The current CultureFit results are early usability evidence, not a business launch decision or proof of real-world outcomes.

**References:** [Checkpoint tests, feedback and risk response](revisions.md) · [Final PRD](prd-final.md) · [AI-use disclosure](ai-use-disclosure.md) · [Repository](https://github.com/mmacf123/practice-/)

*Final review: confirm that these first-person statements match your actual decisions and the submitted Replit version.*
