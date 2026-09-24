import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Carousel } from './Carousel.js';
import { DatePicker } from './DatePicker.js';
import { Slider } from './Slider.js';
import { Stepper } from './Stepper.js';
import { Timeline } from './Timeline.js';
import { TreeView } from './TreeView.js';

describe('Slider', () => {
  it('reports numeric changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Slider label="Volume" defaultValue={30} onChange={onChange} />);
    const slider = screen.getByRole('slider', { name: 'Volume' });
    await user.click(slider);
    expect(slider).toHaveValue('30');
  });
});

describe('Stepper', () => {
  const STEPS = [
    { id: 'a', label: 'Alpha' },
    { id: 'b', label: 'Beta' },
    { id: 'c', label: 'Gamma' },
  ];

  it('marks done, current, and upcoming steps', () => {
    render(<Stepper steps={STEPS} current="b" />);
    expect(screen.getByRole('button', { name: /Beta/ })).toHaveAttribute('aria-current', 'step');
  });

  it('navigates on step click', async () => {
    const user = userEvent.setup();
    const onStep = vi.fn();
    render(<Stepper steps={STEPS} current="a" onStep={onStep} />);
    await user.click(screen.getByRole('button', { name: /Gamma/ }));
    expect(onStep).toHaveBeenCalledWith('c');
  });
});

describe('Timeline', () => {
  it('renders events in order with tones', () => {
    render(
      <Timeline
        items={[
          { id: '1', time: '09:00', title: 'Build started', tone: 'info' },
          { id: '2', time: '09:05', title: 'Deployed', description: 'Production', tone: 'success' },
        ]}
      />,
    );
    expect(screen.getByText('Build started')).toBeInTheDocument();
    expect(screen.getByText('Production')).toBeInTheDocument();
  });
});

describe('TreeView', () => {
  const NODES = [
    {
      id: 'src',
      label: 'src',
      children: [
        { id: 'a', label: 'App.tsx' },
        { id: 'b', label: 'index.css' },
      ],
    },
  ];

  it('expands and selects nodes', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<TreeView nodes={NODES} onSelect={onSelect} />);
    expect(screen.queryByText('App.tsx')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Expand src' }));
    await user.click(screen.getByRole('button', { name: 'App.tsx' }));
    expect(onSelect).toHaveBeenCalledWith('a');
  });
});

describe('Carousel', () => {
  it('navigates slides and dots', async () => {
    const user = userEvent.setup();
    render(
      <Carousel>
        <p>First</p>
        <p>Second</p>
      </Carousel>,
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute('aria-current', 'true');
    await user.click(screen.getByRole('button', { name: 'Go to slide 1' }));
    expect(screen.getByRole('button', { name: 'Go to slide 1' })).toHaveAttribute('aria-current', 'true');
  });
});

describe('DatePicker', () => {
  it('opens the calendar and picks a day', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker label="Due" defaultValue="2026-09-10" onChange={onChange} />);
    await user.click(screen.getByRole('textbox', { name: 'Due' }));
    expect(screen.getByRole('dialog', { name: 'Due' })).toBeInTheDocument();
    await user.click(screen.getByRole('gridcell', { name: '15 September 2026' }));
    expect(onChange).toHaveBeenCalledWith('2026-09-15');
  });

  it('disables out-of-range days', async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Due" defaultValue="2026-09-10" min="2026-09-10" max="2026-09-12" />);
    await user.click(screen.getByRole('textbox', { name: 'Due' }));
    expect(screen.getByRole('gridcell', { name: '9 September 2026' })).toBeDisabled();
    expect(screen.getByRole('gridcell', { name: '13 September 2026' })).toBeDisabled();
    expect(screen.getByRole('gridcell', { name: '11 September 2026' })).not.toBeDisabled();
  });

  it('drills down through month and year pickers', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker label="Due" defaultValue="2026-09-10" onChange={onChange} />);
    await user.click(screen.getByRole('textbox', { name: 'Due' }));
    await user.click(screen.getByRole('button', { name: 'Choose month' }));
    await user.click(screen.getByRole('button', { name: 'Desember 2026' }));
    await user.click(screen.getByRole('gridcell', { name: '25 Desember 2026' }));
    expect(onChange).toHaveBeenCalledWith('2026-12-25');
  });

  it('picks a year then a month', async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Due" defaultValue="2026-09-10" />);
    await user.click(screen.getByRole('textbox', { name: 'Due' }));
    await user.click(screen.getByRole('button', { name: 'Choose month' }));
    await user.click(screen.getByRole('button', { name: 'Choose year' }));
    await user.click(screen.getByRole('button', { name: 'Year 2027' }));
    await user.click(screen.getByRole('button', { name: 'Januari 2027' }));
    expect(screen.getByRole('grid', { name: 'Januari 2027' })).toBeInTheDocument();
  });
});
