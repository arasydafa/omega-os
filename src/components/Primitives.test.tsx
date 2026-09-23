import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar, initials } from './Avatar.js';
import { Button } from './Button.js';
import { Card } from './Card.js';
import { Spinner } from './Spinner.js';

describe('initials', () => {
  it('derives uppercase initials from two words', () => {
    expect(initials('Omega Throne')).toBe('OT');
    expect(initials('  vstack  ')).toBe('V');
  });
});

describe('Card', () => {
  it('renders children with padding variants', () => {
    const { rerender } = render(<Card>Body</Card>);
    expect(screen.getByText('Body')).toHaveClass('p-5');
    rerender(<Card padding="none">Body</Card>);
    expect(screen.getByText('Body')).toHaveClass('p-0');
  });
});

describe('Avatar', () => {
  it('renders initials with an accessible name', () => {
    render(<Avatar name="Omega Throne" />);
    expect(screen.getByRole('img', { name: 'Omega Throne' })).toHaveTextContent('OT');
  });

  it('renders the image when src is set', () => {
    render(<Avatar name="Omega Throne" src="https://example.com/a.png" />);
    expect(screen.getByRole('img', { name: 'Omega Throne' }).querySelector('img')).toHaveAttribute(
      'src',
      'https://example.com/a.png',
    );
  });
});

describe('Spinner', () => {
  it('announces loading status', () => {
    render(<Spinner />);
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('keeps Button loading spinner working', () => {
    render(<Button loading>Save</Button>);
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
