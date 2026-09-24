import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Heatmap } from './Heatmap.js';
import { Treemap, squarifyLayout } from './Treemap.js';
import { WordCloud, repelOverlaps, wordFontSize } from './WordCloud.js';
import { formatTick } from './Scatter.js';

describe('repelOverlaps', () => {
  it('pushes along the smallest-penetration axis', () => {
    const out = repelOverlaps(
      { left: 90, top: 0, right: 140, bottom: 20 },
      [{ text: 'ui', box: { left: 100, top: 0, right: 150, bottom: 20 } }],
    );
    // Vertical overlap (20) beats horizontal (40): push is vertical.
    expect(out.ui).toEqual({ x: 0, y: -30 });
  });

  it('leaves separated words alone', () => {
    const out = repelOverlaps(
      { left: 0, top: 0, right: 50, bottom: 20 },
      [{ text: 'ui', box: { left: 100, top: 0, right: 150, bottom: 20 } }],
    );
    expect(out).toEqual({});
  });
});

describe('formatTick', () => {
  it('keeps integers clean and trims tweened floats', () => {
    expect(formatTick(4)).toBe('4');
    expect(formatTick(2.3)).toBe('2.3');
    expect(formatTick(2.3000000000000003)).toBe('2.3');
    expect(formatTick(NaN)).toBe('—');
  });
});

describe('squarifyLayout', () => {
  it('preserves total area', () => {
    const rects = squarifyLayout(
      [
        { label: 'A', value: 6 },
        { label: 'B', value: 3 },
        { label: 'C', value: 1 },
      ],
      0,
      0,
      300,
      200,
    );
    const area = rects.reduce((s, r) => s + r.w * r.h, 0);
    expect(rects.length).toBe(3);
    expect(area).toBeCloseTo(300 * 200, 0);
  });
});

describe('Treemap', () => {
  it('renders blocks and selects on click', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Treemap
        data={[
          { label: 'Tools', value: 6 },
          { label: 'Docs', value: 1 },
        ]}
        onSelect={onSelect}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Tools' }));
    expect(onSelect).toHaveBeenCalledWith('Tools');
  });
});

describe('wordFontSize', () => {
  it('scales monotonically with weight', () => {
    expect(wordFontSize(100, 1, 100)).toBeGreaterThan(wordFontSize(10, 1, 100));
    expect(wordFontSize(10, 1, 100)).toBeGreaterThan(wordFontSize(1, 1, 100));
  });
});

describe('WordCloud', () => {
  it('renders words sized by weight', () => {
    render(
      <WordCloud
        words={[
          { text: 'omega', weight: 10 },
          { text: 'ui', weight: 2 },
        ]}
      />,
    );
    const omega = screen.getByText('omega');
    const ui = screen.getByText('ui');
    expect(parseFloat(omega.style.fontSize)).toBeGreaterThan(parseFloat(ui.style.fontSize));
  });

  it('drags a word to a new offset', () => {
    render(<WordCloud words={[{ text: 'omega', weight: 10 }]} />);
    const word = screen.getByText('omega');
    const zone = screen.getByRole('img');
    fireEvent(
      word,
      new MouseEvent('pointerdown', { clientX: 0, clientY: 0, bubbles: true }),
    );
    fireEvent(
      zone,
      new MouseEvent('pointermove', { clientX: 12, clientY: 8, bubbles: true }),
    );
    fireEvent(zone, new MouseEvent('pointerup', { bubbles: true }));
    expect(word.style.transform).toContain('translate(12px, 8px)');
  });

  it('snaps back when dropped onto another word', () => {
    const rect = (x: number) => ({ left: x, right: x + 50, top: 0, bottom: 20 }) as DOMRect;
    // Pretend the dragged word already sits on top of the second word.
    const spy = vi
      .spyOn(Element.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: Element) {
        return this.textContent === 'omega' ? rect(90) : rect(100);
      });
    try {
      render(
        <WordCloud
          words={[
            { text: 'omega', weight: 10 },
            { text: 'ui', weight: 9 },
          ]}
        />,
      );
      const word = screen.getByText('omega');
      const zone = screen.getByRole('img');
      fireEvent(word, new MouseEvent('pointerdown', { clientX: 0, clientY: 0, bubbles: true }));
      // Hover over the second word's box: it gets pushed away mid-drag…
      fireEvent(zone, new MouseEvent('pointermove', { clientX: 110, clientY: 5, bubbles: true }));
      expect(screen.getByText('ui').style.transform).not.toContain('translate(0px, 0px)');
      fireEvent(zone, new MouseEvent('pointerup', { bubbles: true }));
      // …then springs back on drop, and the dragged word resets (overlap guard).
      expect(word.style.transform).toContain('translate(0px, 0px)');
      expect(screen.getByText('ui').style.transform).toContain('translate(0px, 0px)');
    } finally {
      spy.mockRestore();
    }
  });
});

describe('Heatmap', () => {
  const DATA = [
    { x: 'Mon', y: 'CPU', value: 10 },
    { x: 'Tue', y: 'CPU', value: 90 },
    { x: 'Mon', y: 'Mem', value: 50 },
  ];

  it('renders one cell per coordinate with intensity', () => {
    const { container } = render(<Heatmap data={DATA} xLabels={['Mon', 'Tue']} yLabels={['CPU', 'Mem']} />);
    const cells = container.querySelectorAll('[data-intensity]');
    expect(cells.length).toBe(4);
    const intensities = [...cells].map((c) => (c as HTMLElement).dataset.intensity);
    expect(Math.max(...intensities.map(Number))).toBe(1);
    expect(Math.min(...intensities.map(Number))).toBe(0);
  });

  it('selects a cell on click', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Heatmap data={DATA} onSelect={onSelect} />);
    await user.click(screen.getByRole('button', { name: 'Tue, CPU, value 90' }));
    expect(onSelect).toHaveBeenCalledWith({ x: 'Tue', y: 'CPU', value: 90 });
  });
});
