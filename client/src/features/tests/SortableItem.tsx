import React, { memo, useMemo } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableItemProps = {
  children?: React.ReactNode;
  id: number | string;
};

const SortableItem: React.FC<SortableItemProps> = memo(
  ({ children, id }: SortableItemProps): React.JSX.Element => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = useMemo(
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
  },
);

SortableItem.displayName = 'SortableItem';

export default SortableItem;
