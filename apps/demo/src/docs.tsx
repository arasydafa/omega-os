import { useEffect, useState } from 'react';

export interface DocSectionDef {
  id: string;
  label: string;
}

export interface DocGroupDef {
  id: string;
  label: string;
  sections: DocSectionDef[];
}

/** Docs navigation: mirrors the anchor ids rendered in App. */
export const DOC_GROUPS: DocGroupDef[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    sections: [
      { id: 'typography', label: 'Typography' },
      { id: 'colors', label: 'Colors' },
      { id: 'radius', label: 'Radius' },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    sections: [
      { id: 'buttons', label: 'Buttons' },
      { id: 'badges', label: 'Badges' },
      { id: 'alerts', label: 'Alerts' },
      { id: 'fields', label: 'Fields' },
      { id: 'complements', label: 'Complements' },
      { id: 'primitives', label: 'Primitives' },
    ],
  },
  {
    id: 'overlays',
    label: 'Overlays',
    sections: [
      { id: 'overlays-demo', label: 'Toast / Modal' },
      { id: 'command', label: 'Command + Logs' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    sections: [{ id: 'data-table', label: 'Table + Pagination' }],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    sections: [{ id: 'navigation-demo', label: 'Navbar / Sidebar' }],
  },
  {
    id: 'viewers',
    label: 'Viewers',
    sections: [
      { id: 'complex', label: 'Complex' },
      { id: 'viewers-demo', label: 'File / Image' },
    ],
  },
  {
    id: 'charts',
    label: 'Charts',
    sections: [
      { id: 'charts-demo', label: 'Charts' },
      { id: 'graph-demo', label: 'Graph' },
      { id: 'playground', label: 'Drag & Drop' },
    ],
  },
  {
    id: 'icons',
    label: 'Icons',
    sections: [{ id: 'icons-demo', label: 'Icon set' }],
  },
];

export const ALL_SECTION_IDS: string[] = DOC_GROUPS.flatMap((g) => g.sections.map((s) => s.id));

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Highlights the section currently near the top of the viewport. */
export function useScrollSpy(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids.join('|')]);
  return active;
}
