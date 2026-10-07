import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, CircleHelp, RotateCcw, Sparkles, Sprout, Heart } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { blank, buildGuide, concernLabels, concerns, environments, experiences, followUp, missingInputs, workTypes, type Intake } from '@/guide';

import { dressCodes } from '@/company-plan';

const queryClient = new QueryClient();
const BLANK_MSG = 'Tell us a little about your new role first so we can create your guide.';
const benefits = [
  { title: 'Wear with confidence', detail: 'An outfit plan for day one and meetings, with what to confirm.', preview: 'Your first-week outfit' },
  { title: 'Ask with confidence', detail: 'Ready-to-use questions, with who to ask and when.', preview: 'Questions you can use' },
  { title: 'Settle in with support', detail: 'Three milestones that help you get clear, get feedback and get support.', preview: 'Your first-month plan' },
];

function App() {
  const [screen, setScreen] = useState<'landing' | 'form' | 'loading' | 'results'>('landing');
  const [form, setForm] = useState<Intake>(blank);
  const [validation, setValidation] = useState('');
  const [missing, setMissing] = useState<string[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [feel, setFeel] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (screen !== 'loading') return;
    const t = window.setTimeout(() => setScreen('results'), 1000);
    return () => window.clearTimeout(t);
  }, [screen]);
  useEffect(() => { window.scrollTo({ top: 0 }); }, [screen]);

  const guide = useMemo(() => buildGuide(form), [form]);
  const first = form.name.trim();
  const update = (k: keyof Intake, v: string) => setForm((o) => ({ ...o, [k]: v }));
  const toggle = (c: string) => setForm((o) => ({ ...o, concerns: o.concerns.includes(c) ? o.concerns.filter((x) => x !== c) : o.concerns.length < 3 ? [...o.concerns, c] : o.concerns }));

  const generate = () => {
    const m = missingInputs(form);
    if (m.length) {
      setMissing(m);
      const blankAll = !form.role.trim() && !form.environment && !form.concerns.length;
      setValidation(blankAll ? BLANK_MSG : `Almost there. Still needed: ${m.join(', ')}.`);
      window.setTimeout(() => {
        const id = m[0] === 'role' ? 'role-title' : m[0] === 'work environment' ? 'env-0' : 'concern-0';
        document.getElementById(id)?.focus();
      }, 0);
      return;
    }
    setValidation(''); setMissing([]); setDone([]); setFeel(''); setNote('');
    setScreen('loading');
  };
  const reset = () => { setForm(blank); setDone([]); setFeel(''); setNote(''); setValidation(''); setMissing([]); setScreen('landing'); };
  const pct = guide.milestones.length ? Math.round((done.length / guide.milestones.length) * 100) : 0;

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={reset} data-testid="button-brand-home" aria-label="CultureFit home">
          <span className="brand-mark"><Sprout size={19} strokeWidth={2.2} /></span>
          <span>CultureFit<span className="brand-period">.</span></span>
        </button>
      </header>
      <main>
        {screen === 'landing' && <section className="cf-landing screen-enter" data-testid="screen-landing">
          <section className="cf-copy" aria-labelledby="welcome-heading">
            <div className="eyebrow"><span className="eyebrow-line" /> NEW JOB, NEW ROOM</div>
            <h1 id="welcome-heading">Settle In.<br /><em>Stand Out.</em></h1>
            <p className="hero-text" data-testid="text-goal">Feel more like you in your new workplace.</p>
            <button className="primary-button hero-button" onClick={() => setScreen('form')} data-testid="button-understand-workplace">Build My Guide <ArrowRight size={18} /></button>
            <p className="cf-start-hint">Start with three quick questions.</p>
          </section>
          <section className="cf-overview" aria-labelledby="overview-heading">
            <div className="cf-overview-heading"><span className="section-kicker">YOUR GUIDE, IN THREE PARTS</span><h2 id="overview-heading">A little clarity. A little confidence.</h2></div>
            <div className="cf-section-grid">{benefits.map((b, i) => <article className="cf-section-card" key={b.title}>
              <span className="cf-section-number">0{i + 1}</span>
              <h3>{b.title}</h3><p>{b.detail}</p><span className="cf-section-preview">{b.preview}</span>
            </article>)}</div>
          </section>
        </section>}

        {screen === 'form' && <section className="form-page screen-enter" data-testid="screen-intake">
          <button className="back-link" onClick={() => setScreen('landing')} data-testid="button-back-home"><ArrowLeft size={16} /> Back</button>
          <div className="form-heading"><h1>Hi{first ? `, ${first}` : ''}. Let&apos;s <em>get you settled</em></h1><p>Three quick things. Everything else is optional.</p></div>
          <form className="intake-form" noValidate onSubmit={(e) => { e.preventDefault(); generate(); }}>
            <div className="field-group">
              <h2 className="cf-form-section-title">About you</h2>
              <label className="field-label" htmlFor="first-name">First name <span className="subtle">(optional)</span></label>
              <input id="first-name" data-testid="input-first-name" className="text-input" autoComplete="off" placeholder="So we can say hi" value={form.name} onChange={(e) => update('name', e.target.value)} />
            </div>
            <div className="field-group">
              <label className="field-label" htmlFor="role-title">Your new role<span className="required-mark">*</span></label>
              <input id="role-title" data-testid="input-role-title" className="text-input" placeholder="e.g., Marketing Associate" value={form.role}
                aria-invalid={missing.includes('role')} aria-describedby={missing.includes('role') ? 'err-role' : undefined} onChange={(e) => update('role', e.target.value)} />
              {missing.includes('role') && <div className="field-error" id="err-role">Add your role.</div>}
            </div>
            <fieldset className="field-group concern-field" aria-describedby={missing.includes('work environment') ? 'err-env' : undefined}>
              <legend className="field-label">Your workplace<span className="required-mark">*</span></legend>
              <div className="env-row">{environments.map((e, i) => <button type="button" id={`env-${i}`} key={e} aria-pressed={form.environment === e} className={`concern-option env-option ${form.environment === e ? 'selected' : ''}`} onClick={() => update('environment', e)} data-testid={`env-${i}`}>{e}</button>)}</div>
              {missing.includes('work environment') && <div className="field-error" id="err-env">Pick where you work.</div>}
            </fieldset>
            <fieldset className="field-group concern-field" aria-describedby={missing.includes('at least one concern') ? 'err-concern' : undefined}>
              <legend className="field-label">Your priorities <span className="subtle">Pick up to 3</span><span className="required-mark">*</span></legend>
              <p className="field-hint">What feels unclear?</p>
              <div className="concern-grid">{concerns.map((c, i) => {
                const on = form.concerns.includes(c);
                return <button type="button" id={`concern-${i}`} key={c} aria-pressed={on} disabled={!on && form.concerns.length >= 3} className={`concern-option ${on ? 'selected' : ''}`} onClick={() => toggle(c)} data-testid={`concern-${i}`}>
                  <span className="option-check">{on && <Check size={12} />}</span>{concernLabels[c]}</button>;
              })}</div>
              {missing.includes('at least one concern') && <div className="field-error" id="err-concern">Pick at least one.</div>}
            </fieldset>
            <div className="field-grid">
              <div className="field-group"><label className="field-label" htmlFor="workplace">Workplace type <span className="subtle">(optional)</span></label>
                <select id="workplace" className="text-input select-input has-value" data-testid="select-workplace" value={form.workplace} onChange={(e) => update('workplace', e.target.value)}><option value="">Skip</option>{workTypes.map((o) => <option key={o}>{o}</option>)}</select></div>
              <div className="field-group"><label className="field-label" htmlFor="experience">Experience <span className="subtle">(optional)</span></label>
                <select id="experience" className="text-input select-input has-value" data-testid="select-experience" value={form.experience} onChange={(e) => update('experience', e.target.value)}><option value="">Skip</option>{experiences.map((o) => <option key={o}>{o}</option>)}</select></div>
            </div>
            <section className="cf-company-brief" aria-labelledby="company-brief-heading">
            <h2 id="company-brief-heading" className="cf-form-section-title">My Company &amp; Team</h2>
            <div className="field-grid cf-company-grid">
              <div className="field-group"><label className="field-label" htmlFor="company">Company <span className="subtle">(optional)</span></label>
                <input id="company" data-testid="input-company" className="text-input" autoComplete="off" value={form.company} onChange={(e) => update('company', e.target.value)} /></div>
              <div className="field-group"><label className="field-label" htmlFor="team">Team <span className="subtle">(optional)</span></label>
                <input id="team" data-testid="input-team" className="text-input" autoComplete="off" value={form.team} onChange={(e) => update('team', e.target.value)} /></div>
              <div className="field-group"><label className="field-label" htmlFor="dress-code">Dress code you were told <span className="subtle">(optional)</span></label>
                <select id="dress-code" className="text-input select-input has-value" data-testid="select-dress-code" value={form.dressCode} onChange={(e) => update('dressCode', e.target.value)}>{dressCodes.map((o) => <option key={o}>{o}</option>)}</select></div>
            </div>
            <div className="field-group">
              <label className="field-label" htmlFor="team-context">What you already know <span className="subtle">(optional)</span></label>
              <p className="field-hint cf-hint-top" id="context-hint">Paste a welcome email, dress guidance or manager expectations. Remove names and private information first. Nothing is researched or verified.</p>
              <textarea id="team-context" aria-describedby="context-hint" data-testid="input-team-context" className="text-input context-input" placeholder="Example: my manager said business casual." value={form.context} onChange={(e) => update('context', e.target.value)} rows={4} />
            </div>
            </section>
            {validation && <div className="validation-message" role="alert" data-testid="status-validation"><CircleHelp size={17} />{validation}</div>}
            <div className="form-actions"><span className="required-note"><span className="required-mark">*</span> Needed</span><button className="primary-button" type="submit" data-testid="button-generate">Build my guide <ArrowRight size={17} /></button></div>
          </form>
        </section>}

        {screen === 'loading' && <section className="loading-screen screen-enter" data-testid="status-loading" role="status" aria-live="polite">
          <div className="loading-illustration"><div className="loading-ring" /><Sprout size={34} /></div>
          <h1>Warming up your<br /><em>first-week guide...</em></h1><p>Simulated AI, one moment.</p>
        </section>}

        {screen === 'results' && <section className="results-page cf-results screen-enter" data-testid="screen-results">
          <div className="results-topline"><button className="back-link" onClick={() => { setValidation(''); setMissing([]); setScreen('form'); }} data-testid="button-edit-answers"><ArrowLeft size={16} /> Edit answers</button></div>
          <div className="results-intro"><h1>{first ? `${first}, here's your guide` : 'Your guide'}{guide.companyLabel && <span className="cf-company-label" data-testid="text-company-label">{guide.companyLabel}</span>}</h1>
            <p className="cf-goal" data-testid="text-goal-results"><Heart size={16} /> Your goal: feel a sense of belonging in your new workplace.</p>
            <p className="results-context">{form.role}, {form.environment.toLowerCase()}{form.workplace ? `, ${form.workplace.toLowerCase()}` : ''}{form.experience ? `, ${form.experience.toLowerCase()}` : ''}.</p>
            <div className="uncertainty-banner" data-testid="text-context-unknown"><CircleHelp size={16} /><span><strong>Simulated AI, session only.</strong> We don&apos;t know your team&apos;s real norms. Use these as starting points and confirm with people.</span></div>
          </div>
          <details className="cf-details cf-basis" data-testid="details-basis"><summary>Your brief and how this was built</summary>
            <p className="cf-why"><strong>Brief:</strong> {form.role}, {form.environment.toLowerCase()}{guide.companyLabel ? `, ${guide.companyLabel}` : ''}{form.dressCode !== 'Not sure yet' ? `, dress code entered: ${form.dressCode}` : ''}.</p>
            {guide.context && <blockquote className="cf-excerpt" data-testid="text-user-context"><span>What you provided (not verified)</span>{guide.context}</blockquote>}
            <p className="cf-why" data-testid="text-basis">{guide.basis}</p></details>
          <section className="result-section" data-testid="section-outfit">
            <div className="section-heading"><div><span className="section-kicker">PART 1</span><h2>Your first-week outfit</h2></div></div>
            <article className="cf-outfit">
              <span className="cf-tag" data-testid="text-outfit-label">{guide.outfit.label}</span>
              {guide.outfit.evidence && <blockquote className="cf-excerpt" data-testid="text-outfit-evidence"><span>Supplied by you, not verified</span>{guide.outfit.evidence}</blockquote>}
              <dl className="cf-dl">
                <div><dt>First day</dt><dd>{guide.outfit.firstDay}</dd></div>
                <div><dt>Meetings</dt><dd>{guide.outfit.meeting}</dd></div>
                <div><dt>Alternative</dt><dd>{guide.outfit.alternative}</dd></div>
                <div><dt>Why this suggestion</dt><dd>{guide.outfit.why}</dd></div>
                <div className="cf-confirm-row"><dt>Confirm</dt><dd>{guide.outfit.confirm}</dd></div>
              </dl>
            </article>
          </section>
          <section className="result-section" data-testid="section-questions">
            <div className="section-heading"><div><span className="section-kicker">PART 2</span><h2>Questions you can use</h2></div></div>
            <div className="cf-q-list">{guide.questions.map((q, i) => <article className="cf-q" key={q.topic} data-testid={`card-question-${i}`}>
              <h3>{q.topic}</h3>
              <p className="cf-q-meta"><span><b>Who:</b> {q.who}</span><span><b>When:</b> {q.when}</span></p>
              <p className="cf-script">&ldquo;{q.script}&rdquo;</p></article>)}</div>
          </section>
          <section className="result-section try-section" data-testid="section-milestones">
            <div className="section-heading"><div><span className="section-kicker">PART 3</span><h2>Your first-month plan</h2></div><span className="count-pill" data-testid="text-progress">{done.length} of {guide.milestones.length} done</span></div>
            <div className="cf-bar" role="progressbar" aria-label="Milestones completed" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}><i style={{ transform: `scaleX(${pct / 100})` }} /></div>
            <div className="try-list">{guide.milestones.map((a, i) => {
              const on = done.includes(a.id);
              return <label className={`cf-check ${on ? 'on' : ''}`} key={a.id} data-testid={`step-next-${i}`}>
                <input type="checkbox" checked={on} onChange={() => setDone((d) => on ? d.filter((x) => x !== a.id) : [...d, a.id])} data-testid={`check-step-${i}`} />
                <span className="cf-box"><Check size={14} /></span><span className="cf-check-text"><span className="cf-when">{a.when}</span><strong className="cf-ms-title">{a.title}</strong>{a.text}</span></label>;
            })}</div>
            {pct === 100 && <p className="reflection-confirm" role="status">All done. That took courage.</p>}
          </section>
          <section className="cf-reflect" data-testid="section-reflection">
            <span className="section-kicker">REFLECT AND REALIGN (OPTIONAL)</span>
            <h3>How did your first moves feel?</h3>
            <div className="reflection-options">{['Comfortable', 'Mixed', 'Not yet'].map((c) => <button type="button" key={c} className={`reflection-option ${feel === c ? 'active' : ''}`} aria-pressed={feel === c} onClick={() => setFeel(c)} data-testid={`reflection-${c.toLowerCase().replace(' ', '-')}`}>{c}</button>)}</div>
            {feel && <div className="reflection-confirm" role="status" data-testid="status-reflection"><Sparkles size={15} /> {followUp(feel, form)}</div>}
            {feel && <><label className="field-label" htmlFor="refl-note">One thing you noticed <span className="subtle">(stays on this screen)</span></label>
              <textarea id="refl-note" className="text-input context-input" rows={2} value={note} onChange={(e) => setNote(e.target.value)} data-testid="input-reflection-note" /></>}
          </section>
          <div className="results-bottom"><div className="prototype-note" data-testid="text-prototype-note"><Sparkles size={16} /><span>Prototype with simulated AI. Checks and notes live only in this session.</span></div><button className="start-over-button" onClick={reset} data-testid="button-start-over"><RotateCcw size={15} /> Start over</button></div>
        </section>}
      </main>
      <footer className="site-footer"><span>CultureFit<span className="brand-period">.</span> <i>For the unwritten parts of work.</i></span><span>Your pace.</span></footer>
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={App} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}
function Root() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}
export default Root;
