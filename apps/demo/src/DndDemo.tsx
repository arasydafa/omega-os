import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortItem {
  id: string;
  label: string;
}

const INITIAL: SortItem[] = [
  { id: 'vstack', label: 'VStack' },
  { id: 'cicd-lab', label: 'CI-CD Lab' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'omega-docs', label: 'Omega Docs' },
];

function Row({ item, overlay = false }: { item: SortItem; overlay?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-ot-md border bg-ot-bg px-3.5 py-2.5 text-sm font-medium ${
        overlay ? 'border-navy shadow-ot-md' : 'border-ot-border'
      }`}
    >
      <span aria-hidden className="grid h-4 w-4 place-items-center text-ot-muted">
        <GripVertical size={16} />
      </span>
      {item.label}
    </div>
  );
}

function SortableRow({ item }: { item: SortItem }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="flex items-center gap-2.5 rounded-ot-md border border-ot-border bg-ot-bg px-3.5 py-2.5 text-sm font-medium"
    >
      <button
        type="button"
        aria-label={`Drag ${item.label} to reorder`}
        {...attributes}
        {...listeners}
        className="grid h-4 w-4 cursor-grab place-items-center text-ot-muted active:cursor-grabbing"
      >
        <GripVertical size={16} aria-hidden />
      </button>
      {item.label}
    </div>
  );
}

export function DndDemo() {
  const [items, setItems] = useState(INITIAL);
  const [active, setActive] = useState<SortItem | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const onStart = (e: DragStartEvent) => {
    setActive(items.find((i) => i.id === e.active.id) ?? null);
  };
  const onEnd = (e: DragEndEvent) => {
    setActive(null);
    const { active: a, over } = e;
    if (!over || a.id === over.id) return;
    setItems((prev) => {
      const from = prev.findIndex((i) => i.id === a.id);
      const to = prev.findIndex((i) => i.id === over.id);
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  return (
    <section className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
      <h2 className="mb-1 text-lg font-bold">Drag and drop</h2>
      <p className="mb-4 text-sm text-ot-muted">
        Sortable list via dnd-kit: grip handle to drag, card overlay follows, order persists on drop.
      </p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={onStart} onDragEnd={onEnd} onDragCancel={() => setActive(null)}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="grid max-w-sm gap-2">
            {items.map((item) => (
              <SortableRow key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
        <DragOverlay dropAnimation={{ duration: 200, easing: 'ease' }}>
          {active ? <Row item={active} overlay /> : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}
