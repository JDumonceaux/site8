import type { CSSProperties, JSX, ReactNode } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export type SortableItemProps = {
  /** Row contents */
  children?: ReactNode;
  /** Unique identifier for the sortable item */
  id: number | string;
};

/**
 * A table row that can be reordered via drag-and-drop.
 */
const SortableItem = ({
  children,
  id,
}: SortableItemProps): JSX.Element | null => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </tr>
  );
};

SortableItem.displayName = 'SortableItem';
export default SortableItem;
