import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CopyButton } from './CopyButton.js';

export interface MarkdownProps {
  source: string;
  className?: string;
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-ot-md border border-ot-border">
      <div className="flex items-center gap-2 border-b border-ot-border bg-ot-surface px-3 py-1.5">
        <span className="min-w-0 flex-1 truncate font-mono text-xs text-ot-muted">{language || 'code'}</span>
        <CopyButton text={code} />
      </div>
      <pre className="scrollbar-thin overflow-x-auto bg-ot-bg p-3 font-mono text-[13px] leading-6 text-ot-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function Markdown({ source, className = '' }: MarkdownProps) {
  return (
    <div className={`grid gap-3 font-sans text-sm text-ot-text ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold tracking-tight">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold tracking-tight">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-semibold">{children}</h3>,
          h4: ({ children }) => <h4 className="text-base font-semibold">{children}</h4>,
          p: ({ children }) => <p className="leading-relaxed">{children}</p>,
          a: ({ children, href }) => (
            <a href={href} className="text-navy-text underline underline-offset-2">
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          ul: ({ children }) => <ul className="grid list-disc gap-1 pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="grid list-decimal gap-1 pl-5">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="rounded-ot-sm border-l-2 border-navy bg-ot-surface px-3 py-2 text-ot-muted">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-ot-border" />,
          table: ({ children }) => (
            <div className="overflow-x-auto rounded-ot-md border border-ot-border">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-ot-surface text-left">{children}</thead>,
          th: ({ children }) => (
            <th className="border-b border-ot-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ot-muted">
              {children}
            </th>
          ),
          td: ({ children }) => <td className="border-t border-ot-border px-3 py-2 align-top">{children}</td>,
          code(props) {
            const { children, className: cls } = props as { children?: React.ReactNode; className?: string };
            const match = /language-(\w+)/.exec(cls ?? '');
            const text = String(children ?? '').replace(/\n$/, '');
            if (match && text.includes('\n')) {
              return <CodeBlock language={match[1]} code={text} />;
            }
            return (
              <code className="rounded-ot-sm bg-ot-surface-2 px-1.5 py-0.5 font-mono text-[13px]">{children}</code>
            );
          },
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
