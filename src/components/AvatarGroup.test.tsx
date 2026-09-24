import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AvatarGroup } from './AvatarGroup.js';

describe('AvatarGroup', () => {
  it('stacks avatars and collapses the rest into +N', () => {
    render(
      <AvatarGroup
        avatars={[
          { name: 'Omega Throne' },
          { name: 'Vstack' },
          { name: 'Docs' },
          { name: 'Lab' },
          { name: 'Extra' },
        ]}
        max={3}
      />,
    );
    expect(screen.getByRole('group', { name: '5 people' })).toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });
});
