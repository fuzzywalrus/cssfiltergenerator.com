'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { FilterData } from '@/types/filter';
import { filterConfigs } from '@/lib/filterDefaults';
import FilterControl from './FilterControl';

interface SortableFilterProps {
  id: string;
  data: FilterData;
  onValueChange: (value: number) => void;
  onActiveChange: (active: boolean) => void;
}

function SortableFilter({ id, data, onValueChange, onActiveChange }: SortableFilterProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const config = filterConfigs[id];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? 'dragging' : ''}`}
    >
      <FilterControl
        config={config}
        data={data}
        onValueChange={onValueChange}
        onActiveChange={onActiveChange}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

interface SortableFilterListProps {
  filters: Record<string, FilterData>;
  onUpdateFilter: (filterId: string, updates: Partial<FilterData>) => void;
}

export default function SortableFilterList({ filters, onUpdateFilter }: SortableFilterListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Sort filters by position for rendering
  const sortedFilterIds = Object.keys(filters).sort(
    (a, b) => filters[a].position - filters[b].position
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sortedFilterIds.indexOf(active.id as string);
      const newIndex = sortedFilterIds.indexOf(over.id as string);
      
      const newOrder = arrayMove(sortedFilterIds, oldIndex, newIndex);
      
      // Update positions for all filters
      newOrder.forEach((filterId, index) => {
        onUpdateFilter(filterId, { position: index });
      });
    }
  };

  return (
    <div suppressHydrationWarning>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
      <SortableContext items={sortedFilterIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {sortedFilterIds.map((filterId) => (
            <SortableFilter
              key={filterId}
              id={filterId}
              data={filters[filterId]}
              onValueChange={(value) => onUpdateFilter(filterId, { value })}
              onActiveChange={(active) => onUpdateFilter(filterId, { active })}
            />
          ))}
        </div>
      </SortableContext>
      </DndContext>
    </div>
  );
}