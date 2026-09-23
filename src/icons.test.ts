import { describe, expect, it } from 'vitest';
import * as lucide from 'lucide-react';
import { OMEGA_ICONS, iconComponentName } from './icons.js';

describe('OMEGA_ICONS', () => {
  it('resolves every name to a lucide-react export', () => {
    const missing = OMEGA_ICONS.filter(
      (name) => !(lucide as unknown as Record<string, unknown>)[iconComponentName(name)],
    );
    expect(missing).toEqual([]);
  });

  it('converts kebab-case to PascalCase exports', () => {
    expect(iconComponentName('trash-2')).toBe('Trash2');
    expect(iconComponentName('triangle-alert')).toBe('TriangleAlert');
    expect(iconComponentName('more-horizontal')).toBe('MoreHorizontal');
  });
});
