# CultureFit — Implementation and Ethics Reflection

## Product judgment

I chose CultureFit because starting a new job can be overwhelming, especially when no one explains the unwritten rules. I wanted to build something I wish I had: a tool that helps people understand what to wear, how to communicate, and how to feel more comfortable in a new workplace. I thought AI could eventually make that advice more personal than a general onboarding checklist.

I prioritized **one complete user journey over adding more features**. Users enter their role, work setting, and priorities; receive outfit suggestions, questions to ask, and first-month milestones; and can edit their information or check off actions. The goal is to reduce guessing while still leaving the final decisions with the employee and their manager. As I worked on the prototype, I realized that an app cannot automatically know the expectations of a specific team. I did not try to build a complete HR onboarding platform or claim that CultureFit can verify company policies.

## Building with AI and my own judgment

I genuinely enjoyed getting to build an app with AI assistance. Learning to **vibe code** was one of the most interesting parts of the project. I could explain an idea, see it turn into a working screen, and ask the AI to change something right away. That made experimenting with layouts and features much easier than I expected, without having to build every part from scratch.

AI also created challenges. For example, the outfit recommendations were initially too basic. The app was not distinguishing clearly enough between everyday office clothes and outfits for a client meeting. I had to give more specific instructions about the role, work setting, and outfit criteria instead of accepting the first result. This taught me that AI can help build quickly, but **I still need to decide what makes a recommendation useful**. Replit's AI tools helped with development, and I used ChatGPT for brainstorming and writing support. The submitted prototype itself uses prepared recommendations and local rules rather than a connected live AI model. Making that distinction is important.

## Risks and trade-offs

**Risk 1 — Inaccurate or biased advice.** Someone could follow CultureFit's suggestions and find that they do not match their workplace. Professional expectations can depend on a specific manager, company, industry, or situation. The advice could also be biased if it assumes everyone has the same budget, clothing options, comfort level, or idea of what looks “professional.” New employees who are relying on the tool for confidence could be especially affected. I would not want someone to think an online suggestion is more trustworthy than their own judgment or a direct answer from their manager.

**Risk 2 — Privacy and personal information.** Users may enter details about their job, company, preferences, or questions they do not want shared. I would be concerned about information being leaked, stored unexpectedly, or sent to outside services without people understanding that choice. This becomes even more important if I later connect CultureFit to live AI or internet research. The current checkpoint prototype does **not** establish that live web research is working, so I am treating those privacy questions as important requirements for a future version, not as protections already solved.

## Safeguards, evidence, and what is still missing

The prototype already gives users some control: they can change their inputs, review suggestions, and check off or adjust their actions. I also worked on wording that makes uncertain dress-code advice less definite and encourages users to confirm unclear expectations with a manager. In my checkpoint tests, a confusing “professional” versus “casual” input exposed a problem; I revised the response, and the targeted retest improved. That shows the value of testing the experience, but it does not prove every recommendation will be accurate.

For a future live-AI version, I would want users to see **what comes from published company information, what is general advice, and what is only a personalized suggestion**. I would also want sources when available and clear choices about what information is shared. These source labels and privacy controls are **future goals**, not features I can claim are fully implemented today.

## Connections to two course concepts

**1. Can Machines Think? — behavior versus understanding.** In our *Can Machines Think?* lecture, we discussed the Turing Test and the Chinese Room argument, including the difference between producing convincing responses and actually understanding what they mean (Hughes, September 10, 2026, slides 6 and 12). I found this especially interesting while vibe coding. I could describe a product idea and watch AI turn it into code and a website. That feels like the machine is thinking and acting on the idea, which is exciting. But a polished app or confident answer does not mean the system truly understands a particular workplace. My experience showed me why human review still matters.

**2. Ownership, Privacy, and Data — meaningful consent and control.** The *Ownership, Privacy, and Data* lecture asked what people actually give permission for when they share information. It also showed how prompts can move through applications, logs, and connected services (Hughes, November 5, 2026, slides 10, 12, and 26). This connects directly to CultureFit: someone asking about an awkward workplace situation should know how their information could be used, and should be able to correct or question a recommendation. I learned that using public information does not automatically make every use of it appropriate, and that privacy needs to be considered before connecting more tools.

## Entrepreneurial learning

The biggest thing I learned is that I can use AI resources to take an idea I care about and turn it into a real prototype. I also learned practical skills I had not used much before, including working in Replit, sharing code through GitHub, and organizing project information in `.md` files. More importantly, I learned that building an app and proving people need it are two different things. I think CultureFit addresses a real need, but I would want to test it with actual new employees and employers before launching it.

I can apply this to my ESTEEM capstone because I am also exploring how to build and test an MVP for a proposed Skills Savings Account. In both projects, the goal is to start with a specific user problem, test assumptions, listen to feedback, and improve the product before adding complexity. AI makes the building process faster, but it does not replace that judgment.

**Project evidence:** 
https://github.com/mmacf123/practice-/blob/main/revisions.md 
https://github.com/mmacf123/practice-/blob/main/README.md
https://github.com/mmacf123/practice-/blob/main/prd-final.md
