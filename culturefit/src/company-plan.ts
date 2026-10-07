import type { Intake } from './guide';

export const dressCodes = ['Not sure yet', 'Business casual', 'Casual', 'Business formal', 'Uniform / safety requirements'];
export type Question = { topic: string; who: string; when: string; script: string };
export type OutfitPlan = { label: string; firstDay: string; meeting: string; alternative: string; why: string; confirm: string };

function dressEvidence(f: Intake) {
  if (f.dressCode && f.dressCode !== 'Not sure yet') return { code: f.dressCode, evidence: `Dress expectation you entered: ${f.dressCode}.` };
  // This prototype recognizes only short, unambiguous statements. It does not
  // interpret a handbook, a negated rule, or competing policies as a known fact.
  const sentences = f.context.split(/[.!?\n]+/).map((s) => s.trim()).filter(Boolean);
  const matches = sentences.flatMap((sentence) => {
    if (/\b(not|no|never|except|isn't|isn’t|don't|don’t|instead|but)\b/i.test(sentence)) return [];
    const found = [
      { code: 'Business casual', re: /\bbusiness casual\b/i },
      { code: 'Business formal', re: /\b(business formal|suits? required)\b/i },
      { code: 'Casual', re: /\b(casual dress|casual attire|casual dress code)\b/i },
      { code: 'Uniform / safety requirements', re: /\b(uniform|scrubs|PPE|protective equipment)\b/i },
    ].filter((rule) => rule.re.test(sentence));
    return found.length === 1 ? [{ code: found[0].code, evidence: sentence }] : [];
  });
  const unique = new Set(matches.map((m) => m.code));
  if (unique.size === 1) return matches[0];
  return { code: 'Not sure yet', evidence: '' };
}

export function outfitPlan(f: Intake): OutfitPlan & { evidence: string } {
  const { code, evidence } = dressEvidence(f);
  const remote = f.environment === 'Fully remote';
  const safetyRole = /\b(nurse|clinical|laboratory|lab|warehouse|construction|manufacturing|mechanic|chef|healthcare)\b/i.test(f.role);
  const common = { label: evidence ? 'Based on what you shared' : 'Suggested starting point — confirm first', evidence };
  if (code === 'Uniform / safety requirements' || safetyRole) return {
    ...common, firstDay: 'Confirm the required uniform, footwear, and protective equipment before your first shift.',
    meeting: 'Follow site safety requirements, including for meetings held on site.',
    alternative: 'Ask what is supplied and what you need to bring before buying anything.',
    why: 'Safety and role-specific requirements come before general office outfit advice.',
    confirm: 'What uniform, footwear, or protective equipment is required, and which items do you provide?',
  };
  const plans: Record<string, Omit<OutfitPlan, 'label' | 'confirm'>> = {
    'Business casual': {
      firstDay: 'Tailored trousers or chinos, a plain knit top or button-down, and clean loafers or flats.',
      meeting: 'Use the same base; add a blazer or cardigan for a client-facing meeting if that fits the dress policy.',
      alternative: 'An existing plain top and neat trousers work; choose a comfortable fit rather than buying a new outfit.',
      why: 'This is a practical interpretation of the business-casual expectation you supplied—not a verified company rule.',
    },
    'Casual': {
      firstDay: 'Neat trousers, a plain top, and clean sneakers if the policy permits them.',
      meeting: 'A collared shirt or simple knit layer can make the same outfit more meeting-ready.',
      alternative: 'Keep the clothes you feel comfortable in; use a tidy, well-fitting version rather than a new wardrobe.',
      why: 'Your brief points to casual attire. Specific rules about jeans, shoes, and client days still need confirmation.',
    },
    'Business formal': {
      firstDay: 'A coordinated suit or tailored separates, a simple top, and comfortable dress shoes.',
      meeting: 'Reuse that outfit for meetings; check whether the team has any specific client-facing requirements.',
      alternative: 'Ask whether a blazer with coordinated trousers is acceptable before buying a suit.',
      why: 'This follows the formal expectation you supplied while leaving room for your comfort and personal style.',
    },
    'Not sure yet': {
      firstDay: 'For an office role, neat trousers, a plain top, and comfortable closed-toe shoes are a tentative option.',
      meeting: 'Keep a simple layer available, but confirm client-meeting requirements before choosing an outfit.',
      alternative: 'Use pieces you already own. Comfort, accessibility, and any religious or cultural needs matter.',
      why: 'No clear dress expectation was supplied. This is an office starting point, not a claim about your team.',
    },
  };
  const selected = plans[code] ?? plans['Not sure yet'];
  return {
    ...common, ...selected,
    ...(remote ? {
      firstDay: code === 'Business formal' ? 'For your first video call, try a coordinated jacket and simple top, following the formal expectation you supplied.' : 'For your first video call, try a plain knit top or button-down that feels comfortable on camera.',
      meeting: code === 'Business formal' ? 'Keep the formal outfit for client video calls unless your manager confirms a different expectation.' : 'For a client video call, use the same top and an optional simple layer; confirm the team’s camera and dress expectations.',
      alternative: 'Reuse a comfortable top you already own. Plan a separate outfit if you will visit the office.',
      ...(code === 'Not sure yet' ? { why: 'No clear dress expectation was supplied. This is a video-call starting point, not a claim about your team.' } : {}),
    } : {}),
    confirm: remote ? 'For team and client video calls, is there a dress expectation or a camera-on requirement?' : 'Would this outfit fit my first day, and do client meetings have a different dress code?',
  };
}

function roleQuestion(role: string): string {
  if (/\b(marketing|communications|content|social)\b/i.test(role)) return 'Before I draft this, who is the audience, what action do we want them to take, and which result matters most?';
  if (/\b(engineer|developer|software|IT|data|analyst)\b/i.test(role)) return 'I’ve reviewed the task. What are the acceptance criteria, and which trade-off matters most: delivery time, reliability, or scope?';
  if (/\b(sales|customer|support|account)\b/i.test(role)) return 'For this customer issue, what can I resolve myself, and when should I escalate or ask for approval?';
  if (/\b(nurse|clinical|healthcare|lab|laboratory)\b/i.test(role)) return 'Before I do this independently, which protocol should I follow and who should supervise or sign off?';
  return `For my first assignment as ${role.trim() || 'a new team member'}, what does a successful result look like, and could you show me an example?`;
}

export function personalPlan(f: Intake) {
  const outfit = outfitPlan(f);
  const q = (topic: string, who: string, when: string, script: string): Question => ({ topic, who, when, script });
  const options: Record<string, Question> = {
    'Dress code': q('Dress expectations', 'Onboarding contact or manager', 'Before your first day or client meeting', outfit.confirm),
    'Meeting etiquette': q('Make a useful contribution', 'Meeting organizer', 'Before your first team meeting', 'I’ve read the agenda. What decision are we trying to make, and is there anything I should prepare?'),
    'Communicating with my manager': q('Updates that help', 'Your manager', 'At your first check-in', 'Would a short update with progress, blockers, and my next step work for you? How often would you like it?'),
    'Email / Slack / Teams etiquette': q('Clear messages', 'Your manager or onboarding buddy', 'Before you send your first project update', 'Where should I record decisions, and which channel should I use if something is time-sensitive?'),
    'Working remotely': q('Remote expectations', 'Your manager', 'Before your first remote day', 'Which hours should I be available, what response times matter, and how should I flag a blocker?'),
    'Building relationships with coworkers': q('Find your support person', 'A teammate who works with your role', 'During week one', 'Could we have a 15-minute introduction? I’d love to understand how our work connects and one thing that makes collaboration easier.'),
    'Asking questions': q('Ask with a starting point', 'The person assigning your first task', 'Before starting the task', roleQuestion(f.role)),
    'Understanding team expectations': q('Know what good looks like', 'Your manager', 'At your first-week check-in', `For my first month${f.team.trim() ? ` on ${f.team.trim()}` : ''}, which outcome should I prioritize, and what would good progress look like?`),
  };
  const questions = f.concerns.slice(0, 3).map((c) => options[c]).filter(Boolean);
  if (!questions.some((question) => question.topic === 'Ask with a starting point')) {
    questions.push(q('Your first assignment', 'The person assigning your task', 'Before your first assignment', roleQuestion(f.role)));
  }
  const channel = /\b(Slack|Teams)\b/i.exec(f.context)?.[0];
  const milestones = [
    { id: 'week-one', when: 'Week 1', title: 'Get clear and find support', text: `Ask your manager to agree on one first-month outcome and introduce you to an onboarding buddy${f.team.trim() ? ` on ${f.team.trim()}` : ''}.${f.concerns.includes('Dress code') ? ' Confirm your first-day outfit before arriving.' : ''}` },
    { id: 'week-two', when: 'Week 2', title: 'Try a task, then get feedback', text: `Complete a small ${f.role.trim() || 'role-related'} task and share what you tried, the result, and one question${channel ? ` via ${channel}, if your team uses it for updates` : ''}. Ask what to keep and what to change.` },
    { id: 'month-one', when: 'By day 30', title: 'Check whether you have what you need', text: 'Review the agreed outcome with your manager. Name one thing helping you settle in and one missing resource, unclear expectation, or workload concern. Agree on a next step and check-in date.' },
  ];
  return {
    outfit, questions, milestones,
    companyLabel: [f.company.trim(), f.team.trim()].filter(Boolean).join(' · '),
    context: f.context.trim(),
    basis: 'Suggestions use your role, environment, priorities, and simple cues in your brief. Company names are not researched, and pasted guidance is not independently verified.',
  };
}
