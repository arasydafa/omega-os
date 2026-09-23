import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Search } from 'lucide-react';
import { Input, Select, Textarea } from './Input.js';

describe('Input', () => {
  it('renders label, helper, and icon', () => {
    render(<Input label="Tool name" helper="Lowercase only." icon={<Search data-testid="search-icon" />} />);
    expect(screen.getByText('Tool name')).toBeInTheDocument();
    expect(screen.getByText('Lowercase only.')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('shows error with role=alert and marks the field invalid', () => {
    render(<Input label="Tool name" error="Required." />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required.');
    expect(screen.queryByText('Lowercase only.')).not.toBeInTheDocument();
    expect(document.querySelector('input')).toHaveAttribute('aria-invalid', 'true');
    expect(document.querySelector('input')).toHaveClass('border-danger');
    expect(document.querySelector('input')).not.toHaveClass('border-ot-border');
  });

  it('hides helper when error is set', () => {
    render(<Input helper="Helper." error="Error." />);
    expect(screen.queryByText('Helper.')).not.toBeInTheDocument();
  });

  it('supports disabled state', () => {
    render(<Input label="Name" disabled />);
    expect(screen.getByLabelText('Name')).toBeDisabled();
  });
});

describe('Textarea', () => {
  it('renders label and error', () => {
    render(<Textarea label="Bio" error="Too short." />);
    expect(screen.getByText('Bio')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Too short.');
    expect(document.querySelector('textarea')).toHaveAttribute('aria-invalid', 'true');
  });
});

describe('Select', () => {
  it('renders label, options, and chevron', () => {
    const { container } = render(
      <Select label="Role">
        <option>Admin</option>
        <option>Member</option>
      </Select>,
    );
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0);
  });
});
