import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Markdown } from './Markdown.js';

describe('Markdown', () => {
  it('renders headings, links, tables, and code in Omega styles', () => {
    render(
      <Markdown
        source={`# Title

Read the [guide](https://example.com) and run \`npm test\`.

| A | B |
|---|---|
| 1 | 2 |

\`\`\`ts
const a = 1;
const b = 2;
\`\`\`
`}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'guide' })).toHaveAttribute('href', 'https://example.com');
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('npm test')).toBeInTheDocument();
    expect(screen.getByText('ts')).toBeInTheDocument();
  });
});
