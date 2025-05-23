import {
  memo,
  useMemo,
  type FC,
  type ReactNode,
  type CSSProperties,
} from 'react';

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
const SortableItemComponent: FC<SortableItemProps> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = useMemo<CSSProperties>(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [transform, transition],
  );

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </tr>
  );
};

export const SortableItem = memo(SortableItemComponent);
SortableItem.displayName = 'SortableItem';

export default SortableItem;
