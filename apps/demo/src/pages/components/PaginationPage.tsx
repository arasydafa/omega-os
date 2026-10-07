import { useState } from 'react';
import { Badge, Pagination } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function PaginationPage() {
  const [page, setPage] = useState(2);
  return (
    <ComponentPage
      title="Pagination"
      desc="Page stepper with an ellipsis window, disabled ends, and an optional row-count note."
      badges={
        <>
          <Badge tone="navy">ellipsis window</Badge>
          <Badge tone="grey">1-based</Badge>
        </>
      }
      importCode={`import { Pagination } from '@omega-os/ui';

const [page, setPage] = useState(1);

<Pagination
  page={page}
  totalPages={8}
  onChange={setPage}
  note="16 projects, 2 per page"
/>`}
      preview={<Pagination page={page} totalPages={8} onChange={setPage} note="16 projects, 2 per page" />}
      variants={[
        {
          id: 'window',
          title: 'Window',
          desc: 'maxVisible caps numbered buttons. Ellipses mark the gaps.',
          code: `<Pagination page={page} totalPages={20} maxVisible={5} onChange={setPage} />`,
          demo: <Pagination page={10} totalPages={20} maxVisible={5} onChange={() => {}} />,
        },
        {
          id: 'note',
          title: 'Note',
          desc: 'A row-count note keeps the pager honest about totals.',
          code: `<Pagination page={page} totalPages={4} note="16 projects, 4 per page" onChange={setPage} />`,
          demo: <Pagination page={1} totalPages={4} note="16 projects, 4 per page" onChange={() => {}} />,
        },
      ]}
      propsRows={[
        { name: 'page', type: 'number', defaultValue: '-', desc: '1-based current page.' },
        { name: 'totalPages', type: 'number', defaultValue: '-', desc: 'Page count. Below 1 renders nothing.' },
        { name: 'onChange', type: '(page) => void', defaultValue: '-', desc: 'Fires with the next page.' },
        { name: 'maxVisible', type: 'number', defaultValue: '5', desc: 'Max numbered buttons.' },
        { name: 'note', type: 'ReactNode', defaultValue: '-', desc: 'Row-count note beside the pager.' },
      ]}
      rules={[
        'Prev disables on page one. Next disables on the last page.',
        'Tables pair with Pagination and a row-count note.',
        'Page state lives in the parent. The pager only reports.',
      ]}
      prev={{ to: '/components/navbar', label: 'Navbar' }}
      next={{ to: '/components/progress', label: 'Progress' }}
    />
  );
}
