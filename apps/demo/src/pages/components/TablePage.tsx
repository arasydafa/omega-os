import { Badge } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';
import { DataDemo } from '../showcase-sections.js';

export function TablePage() {
  return (
    <ComponentPage
      title="Table"
      desc="Typed rows with selection, header-click sorting, filter box, skeleton loading, and an empty fallback. Pagination usually sits below."
      badges={
        <>
          <Badge tone="navy">sortable</Badge>
          <Badge tone="grey">filterable</Badge>
          <Badge tone="info">skeletons</Badge>
        </>
      }
      importCode={`import { Table, Pagination } from '@omega-os/ui';

<Table<Tool>
  filterable
  columns={[
    { key: 'name', header: 'Tool', sortable: true },
    { key: 'status', header: 'Status', sortable: true },
  ]}
  rows={rows}
  keyOf={(r) => r.id}
/>`}
      preview={<DataDemo />}
      previewNote="Full data pattern: filter, sort, select a row, toggle skeletons, paginate."
      variants={[
        {
          id: 'sorting',
          title: 'Sorting',
          desc: 'Set sortable on a column; click the header to cycle asc → desc → off. Controlled via sortKey/sortDir/onSort when needed.',
          code: `{ key: 'name', header: 'Tool', sortable: true, sortValue: (r) => r.name }`,
          demo: <span className="text-sm text-ot-muted">Click a column header in the preview above.</span>,
        },
        {
          id: 'filter',
          title: 'Filtering',
          desc: 'filterable renders a search box with a live region. Control it with filter/onFilter, customize with filterPlaceholder.',
          code: `<Table filterable filterPlaceholder="Filter tools…" columns={columns} rows={rows} keyOf={(r) => r.id} />`,
          demo: <span className="text-sm text-ot-muted">Type in the filter box in the preview above.</span>,
        },
        {
          id: 'loading',
          title: 'Loading + empty',
          desc: 'loading swaps rows for skeleton bars (override per column with skeleton). Empty rows render emptyTitle/emptyDescription/emptyAction.',
          code: `<Table loading loadingRows={3} emptyTitle="No tools yet" columns={columns} rows={[]} keyOf={(r) => r.id} />`,
          demo: <span className="text-sm text-ot-muted">Toggle “Show skeletons” in the preview above.</span>,
        },
      ]}
      propsRows={[
        { name: 'columns', type: 'TableColumn<T>[]', defaultValue: '-', desc: 'Column defs: key, header, render, align, sortable, sortValue, filterValue, skeleton.' },
        { name: 'rows', type: 'T[]', defaultValue: '-', desc: 'Row data for the current page/slice.' },
        { name: 'keyOf', type: '(row, index) => string | number', defaultValue: '-', desc: 'Stable key per row.' },
        { name: 'selectedKey', type: 'string | number | null', defaultValue: '-', desc: 'Highlights one row; pair with onRowClick.' },
        { name: 'onRowClick', type: '(row) => void', defaultValue: '-', desc: 'Row selection handler.' },
        { name: 'loading', type: 'boolean', defaultValue: 'false', desc: 'Swaps rows for skeletons.' },
        { name: 'loadingRows', type: 'number', defaultValue: '3', desc: 'Number of skeleton rows.' },
        { name: 'filterable', type: 'boolean', defaultValue: 'false', desc: 'Renders the filter box.' },
        { name: 'sortKey / sortDir / onSort', type: 'string | null, SortDir | null, fn', defaultValue: 'uncontrolled', desc: 'Controlled sorting. Omit for uncontrolled.' },
        { name: 'filter', type: 'string', defaultValue: '-', desc: 'Controlled filter text. Omit for uncontrolled.' },
        { name: 'onFilter', type: '(query) => void', defaultValue: '-', desc: 'Fires with filter text.' },
        { name: 'filterPlaceholder', type: 'string', defaultValue: "'Filter rows…'", desc: 'Filter box hint.' },
        { name: 'emptyTitle', type: 'ReactNode', defaultValue: "'No data'", desc: 'Empty-state title.' },
        { name: 'emptyDescription', type: 'ReactNode', defaultValue: '-', desc: 'Empty-state helper line.' },
        { name: 'emptyAction', type: 'ReactNode', defaultValue: '-', desc: 'Empty-state button.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the table wrapper.' },
      ]}
      rules={[
        'Body copy uses Plus Jakarta Sans regular; status cells use one Badge tone per meaning.',
        'Row actions are 32px icon buttons with 12px gaps; destructive uses danger hover.',
        'Large sets always pair Table with Pagination and a row-count note.',
      ]}
      prev={{ to: '/components/submenu-bar', label: 'SubmenuBar' }}
      next={{ to: '/components/tabs', label: 'Tabs' }}
    />
  );
}
