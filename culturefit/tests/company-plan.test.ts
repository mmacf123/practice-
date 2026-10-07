import assert from 'node:assert/strict';
import { test } from 'node:test';
import { blank, buildGuide, concerns, missingInputs, type Intake } from '../src/guide';
import { dressCodes } from '../src/company-plan';

const intake = (overrides: Partial<Intake> = {}): Intake => ({
  ...blank, role: 'Marketing Associate', environment: 'In person',
  concerns: ['Dress code', 'Asking questions', 'Understanding team expectations'],
  ...overrides,
});

test('company and team are optional; required intake stays short', () => {
  assert.deepEqual(missingInputs(blank), ['role', 'work environment', 'at least one concern']);
  assert.deepEqual(missingInputs(intake()), []);
  const guide = buildGuide(intake());
  assert.equal(guide.companyLabel, '');
  assert.match(guide.outfit.label, /confirm/);
  assert.equal(guide.milestones.length, 3);
});

test('company/team brief personalizes output without pretending to research', () => {
  const guide = buildGuide(intake({
    company: 'Example Co', team: 'Brand team',
    context: 'Our dress code is business casual. We use Slack for updates.',
  }));
  assert.equal(guide.companyLabel, 'Example Co · Brand team');
  assert.match(guide.outfit.firstDay, /trousers/);
  assert.match(guide.outfit.evidence, /business casual/);
  assert.match(guide.milestones[0].text, /Brand team/);
  assert.match(guide.milestones[1].text, /Slack/);
  assert.match(guide.questions.find((q) => q.topic === 'Ask with a starting point')!.script, /audience/);
  assert.match(guide.basis, /not researched/);
  assert.match(guide.milestones[2].text, /workload concern/);
});

test('company name by itself does not alter outfit advice or invent facts', () => {
  const without = buildGuide(intake());
  const withName = buildGuide(intake({ company: 'A famous company' }));
  assert.deepEqual(withName.outfit, without.outfit);
  assert.deepEqual(withName.questions, without.questions);
});

test('negated and conflicting dress rules remain unconfirmed', () => {
  for (const context of [
    'Business casual is not required.',
    'We do not wear business casual.',
    'Business casual for office days. Business formal for clients.',
    'No uniform required.',
  ]) {
    const outfit = buildGuide(intake({ context })).outfit;
    assert.equal(outfit.evidence, '', context);
    assert.match(outfit.label, /confirm/, context);
  }
});

test('explicit dress selection takes precedence; every dress option works', () => {
  for (const dressCode of dressCodes) {
    const outfit = buildGuide(intake({ dressCode })).outfit;
    for (const key of ['firstDay', 'meeting', 'alternative', 'why', 'confirm'] as const) assert.ok(outfit[key]);
  }
  assert.match(buildGuide(intake({ dressCode: 'Business formal', context: 'Business casual.' })).outfit.firstDay, /suit/);
});

test('remote advice addresses video calls; safety guidance takes priority', () => {
  const remote = buildGuide(intake({ environment: 'Fully remote' })).outfit;
  assert.match(remote.firstDay, /video call/);
  assert.match(remote.confirm, /camera/);
  assert.match(remote.why, /video-call/);
  assert.match(buildGuide(intake({ environment: 'Fully remote', dressCode: 'Business formal' })).outfit.firstDay, /jacket/);
  const clinical = buildGuide(intake({ role: 'Registered nurse', dressCode: 'Business casual' }));
  assert.match(clinical.outfit.firstDay, /protective equipment/);
  assert.match(clinical.questions.find((q) => q.topic === 'Ask with a starting point')!.script, /protocol/);
});

test('every selected concern gets a question with who and when', () => {
  for (const concern of concerns) {
    const guide = buildGuide(intake({ concerns: [concern] }));
    assert.ok(guide.questions.length >= 1);
    assert.ok(guide.questions.every((q) => q.who && q.when && q.script && q.topic));
    assert.equal(new Set(guide.milestones.map((m) => m.id)).size, 3);
  }
});

test('role changes questions; unknown context remains a supplied excerpt', () => {
  assert.match(buildGuide(intake({ role: 'Software engineer' })).questions.find((q) => q.topic === 'Ask with a starting point')!.script, /acceptance criteria/);
  const context = 'The manager wants the launch draft by Friday.';
  const guide = buildGuide(intake({ context }));
  assert.equal(guide.context, context);
  assert.equal(guide.outfit.evidence, '');
  assert.doesNotMatch(JSON.stringify(guide), /Watch what teammates wear|Look around first/);
});
