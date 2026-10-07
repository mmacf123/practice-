import { personalPlan } from './company-plan';

export const environments = ['In person', 'Hybrid', 'Fully remote'];
export const workTypes = ['Large corporation', 'Small company', 'Startup', 'Nonprofit', 'Government', 'Consulting / professional services', 'Other'];
export const experiences = ['First full-time job', 'Less than 2 years of experience', '2–5 years of experience', '5+ years of experience'];
export const concerns = ['Dress code', 'Meeting etiquette', 'Communicating with my manager', 'Email / Slack / Teams etiquette', 'Working remotely', 'Building relationships with coworkers', 'Asking questions', 'Understanding team expectations'];
export const concernLabels: Record<string, string> = {
  'Dress code': 'What to wear', 'Meeting etiquette': 'Meetings', 'Communicating with my manager': 'Talking with my manager',
  'Email / Slack / Teams etiquette': 'Email and chat', 'Working remotely': 'Working remotely', 'Building relationships with coworkers': 'Making friends at work',
  'Asking questions': 'Asking questions', 'Understanding team expectations': 'What is expected of me',
};

export type Intake = { name: string; role: string; environment: string; workplace: string; experience: string; concerns: string[]; context: string; company: string; team: string; dressCode: string };
export const blank: Intake = { name: '', role: '', environment: '', workplace: '', experience: '', concerns: [], context: '', company: '', team: '', dressCode: 'Not sure yet' };
export type Note = { category: string; title: string; detail: string; label: 'Good starting point' | 'Needs confirmation' };
export type Action = { id: string; text: string };

export function missingInputs(f: Intake): string[] {
  const m: string[] = [];
  if (!f.role.trim()) m.push('role');
  if (!f.environment) m.push('work environment');
  if (!f.concerns.length) m.push('at least one concern');
  return m;
}

type Entry = { cat: string; title: string; detail: string; label: Note['label']; step: string; ask: string };
const byConcern = (f: Intake): Record<string, Entry> => {
  const remote = f.environment === 'Fully remote';
  const bizCasual = /\bbusiness casual\b/i.test(f.context);
  return {
    'Dress code': { cat: 'What to wear', label: 'Needs confirmation',
      title: bizCasual ? 'Use your business-casual brief to plan an outfit.' : 'Choose an outfit and confirm the dress expectations.',
      detail: 'Dress varies by team and occasion. Check client or visitor days.',
      step: remote ? 'Ask what people wear on video calls with clients.' : 'Ask a teammate what to wear on day one and for client meetings.',
      ask: 'Is there anything specific to wear in week one or for meetings?' },
    'Meeting etiquette': { cat: 'Meetings', label: 'Good starting point',
      title: 'Arrive ready, listen for the rhythm, then jump in.',
      detail: 'Notice who speaks when, whether there is an agenda, and where notes live.',
      step: 'Before your next meeting, look for an agenda and jot one thing to add.',
      ask: 'How do people usually share questions in meetings here?' },
    'Communicating with my manager': { cat: 'Your manager', label: 'Needs confirmation',
      title: 'Ask how they like updates and questions.',
      detail: 'Some managers like a quick message, others a regular check-in.',
      step: 'Ask your manager how often to check in and in what format.',
      ask: 'How do you prefer updates: message, email, or a standing chat?' },
    'Email / Slack / Teams etiquette': { cat: 'Email and chat', label: 'Good starting point',
      title: 'Match the channel your team already uses.',
      detail: 'Chat is often for quick things; decisions may live elsewhere.',
      step: 'Ask which channel fits quick questions, and what counts as urgent.',
      ask: 'How fast are replies usually expected, and where are decisions recorded?' },
    'Working remotely': { cat: 'Working remotely', label: 'Needs confirmation',
      title: remote ? 'Check what stays on, what stays async.' : 'Confirm how the team connects across locations.',
      detail: remote ? 'Camera and response habits differ a lot between remote teams.' : 'Ask which days people overlap and how remote folks join in.',
      step: remote ? 'Ask whether cameras are expected and how to join if you are off camera.' : 'Ask how remote teammates are included in meetings.',
      ask: remote ? 'Are cameras expected, or is off camera fine sometimes?' : 'Which days does the team overlap, and how do remote teammates join?' },
    'Building relationships with coworkers': { cat: 'Making friends at work', label: 'Good starting point',
      title: 'Start small: one name, one story, one coffee.',
      detail: remote ? 'A short video chat or a kind follow-up message goes a long way.' : 'Short, real chats show you how work flows and who knows what.',
      step: remote ? 'Invite one teammate to a 15 minute virtual coffee.' : 'Introduce yourself to one teammate and ask what they wish they knew early on.',
      ask: 'Who would be good for me to get to know in my first month?' },
    'Asking questions': { cat: 'Asking questions', label: 'Good starting point',
      title: 'Keep a running list and batch your questions.',
      detail: 'Questions show care. Group them so they are easy to answer.',
      step: 'Start a note of questions and ask your manager when and where to raise them.',
      ask: 'When is the best time and place for me to ask questions?' },
    'Understanding team expectations': { cat: 'What is expected', label: 'Needs confirmation',
      title: 'Ask what a strong first month looks like.',
      detail: 'Only your team can say what good looks like in your role.',
      step: 'Ask your manager what a strong first month looks like.',
      ask: 'What would a great first month look like in this role?' },
  };
};

const envEntry = (f: Intake): Entry => {
  if (f.environment === 'Fully remote') return { cat: 'Remote rhythm', label: 'Good starting point', title: 'Learn when to reply fast and when to take your time.', detail: 'Many remote teams write things down and reply on their own schedule.', step: 'Ask your manager what counts as urgent and when people usually reply.', ask: 'What response time should I expect for messages?' };
  if (f.environment === 'Hybrid') return { cat: 'Office and home days', label: 'Needs confirmation', title: 'Find out who is where, and when.', detail: 'Hybrid teams often have different rhythms on office and home days.', step: 'Ask which days people tend to be in the office.', ask: 'How does the team plan office days?' };
  return { cat: 'First impressions', label: 'Good starting point', title: 'Make expectations explicit in your first check-in.', detail: 'Agree on one early outcome and a person you can turn to for help.', step: 'Ask your manager to name your first priority and introduce you to an onboarding buddy.', ask: 'What should I deliver first, and who can help me get started?' };
};

export function buildGuide(f: Intake) {
  const map = byConcern(f);
  const priority = ['Building relationships with coworkers', 'Asking questions', ...concerns];
  const picked = priority.filter((c, i) => f.concerns.includes(c) && priority.indexOf(c) === i);
  const entries = picked.map((c) => map[c]);
  const env = envEntry(f);
  const notes: Note[] = [env, ...entries.slice(0, 3)].map((e) => ({ category: e.cat, title: e.title, detail: e.detail, label: e.label }));
  const stepTexts = [...entries.slice(0, 3).map((e) => e.step), env.step, 'Ask your manager: “What would a good first week look like?”'];
  const actions: Action[] = Array.from(new Set(stepTexts)).slice(0, 3).map((text, i) => ({ id: `a${i}`, text }));
  const confirm = Array.from(new Set([...entries.slice(0, 3).map((e) => e.ask), env.ask])).slice(0, 4);
  return { notes, actions, confirm, ...personalPlan(f) };
}

export function followUp(choice: string, f: Intake): string {
  const first = f.concerns.map((c) => concernLabels[c]?.toLowerCase())[0] ?? 'one thing';
  if (choice === 'Comfortable') return `Nice. Keep what worked and share it with a teammate. Next, try one small stretch around ${first}.`;
  if (choice === 'Mixed') return `Pick the one moment that felt off and ask one person about ${first} this week.`;
  return `That is okay, it is early. Choose a single question about ${first} and ask your manager or a friendly teammate today.`;
}
