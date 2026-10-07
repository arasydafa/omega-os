import { useState } from 'react';
import { Badge, Stepper } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

const STEPS = [
  { id: 'a', label: 'Alpha', description: 'Done' },
  { id: 'b', label: 'Beta', description: 'Current' },
  { id: 'c', label: 'Gamma', description: 'Next' },
];

export function StepperPage() {
  const [step, setStep] = useState('b');
  return (
    <ComponentPage
      title="Stepper"
      desc="Multi-step progress with done, current, and upcoming states. Clickable when onStep is provided."
      badges={
        <>
          <Badge tone="navy">clickable</Badge>
          <Badge tone="grey">horizontal / vertical</Badge>
        </>
      }
      importCode={`import { Stepper } from '@omega-os/ui';

const [step, setStep] = useState('b');

<Stepper
  current={step}
  onStep={setStep}
  steps={[
    { id: 'a', label: 'Alpha', description: 'Done' },
    { id: 'b', label: 'Beta', description: 'Current' },
    { id: 'c', label: 'Gamma', description: 'Next' },
  ]}
/>`}
      preview={<Stepper current={step} onStep={setStep} steps={STEPS} />}
      variants={[
        {
          id: 'vertical',
          title: 'Vertical',
          desc: 'Tall flows stack the steps with connecting guides.',
          code: `<Stepper orientation="vertical" current={step} steps={steps} />`,
          demo: <Stepper orientation="vertical" current={step} onStep={setStep} steps={STEPS} />,
        },
        {
          id: 'readonly',
          title: 'Read-only',
          desc: 'Omit onStep to render progress without clicks.',
          code: `<Stepper current="b" steps={steps} />`,
          demo: <Stepper current="b" steps={STEPS} />,
        },
      ]}
      propsRows={[
        { name: 'steps', type: 'StepDef[]', defaultValue: '-', desc: 'Steps: id, label, optional description.' },
        { name: 'current', type: 'string', defaultValue: '-', desc: 'Id of the current step.' },
        { name: 'onStep', type: '(id) => void', defaultValue: '-', desc: 'Makes steps clickable. Omit for read-only.' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", desc: 'Layout direction.' },
        { name: 'label', type: 'string', defaultValue: "'Progress'", desc: 'Accessible name for the list.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the list.' },
      ]}
      rules={[
        'Steps read as short nouns. Descriptions stay under three words.',
        'Done steps check. Current step highlights. Upcoming steps dim.',
        'Clickable steppers guard invalid jumps in onStep.',
      ]}
      prev={{ to: '/components/spinner', label: 'Spinner' }}
      next={{ to: '/components/submenu-bar', label: 'SubmenuBar' }}
    />
  );
}
