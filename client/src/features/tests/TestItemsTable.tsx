import type { JSX } from 'react';

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TestItemRow from './TestItemRow';

type TestItem = {
  id: number;
  level?: number;
  lineId: number;
  name: string;
  parent: { id: number; seq: number };
  projectType?: number;
  text: string;
  type?: number;
};

type TestItemsTableProps = {
  readonly data: TestItem[];
  readonly getDefaultProps: (
    lineId: number,
    field: string,
  ) => {
    id: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
  };
  readonly items: number[];
  readonly onDragEnd: (event: DragEndEvent) => void;
};

/**
 * Table component for displaying and managing test items with drag-and-drop functionality.
 * Handles DnD context and renders table structure with sortable rows.
 */
const TestItemsTable = ({
  data,
  getDefaultProps,
  items,
  onDragEnd,
}: TestItemsTableProps): JSX.Element => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Text</th>
          <th>Type</th>
          <th>Level</th>
          <th>Parent</th>
          <th>Seq</th>
          <th>Project Type</th>
          <th>Action</th>
        </tr>
      </thead>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          <tbody>
            {data.map((item) => (
              <TestItemRow
                getDefaultProps={getDefaultProps}
                item={item}
                key={item.lineId}
              />
            ))}
          </tbody>
        </SortableContext>
      </DndContext>
    </table>
  );
};

TestItemsTable.displayName = 'TestItemsTable';
export default TestItemsTable;
