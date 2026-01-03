import type { CSSProperties, ReactNode } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';

export type SortableItemProps = {
  /** Row contents */
  children?: ReactNode;
  /** Unique identifier for the sortable item */
  id: number | string;
};

/**
 * A table row that can be reordered via drag-and-drop.
 */
const SortableItem = ({ children, id }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: CSSProperties = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition: transition ?? undefined,
  };

  const StyledTr = styled.tr<{
    $transform?: string;
    $transition?: string;
  }>`
    ${({ $transform }) => $transform && `transform: ${$transform};`}
    ${({ $transition }) => $transition && `transition: ${$transition};`}
  `;

  return (
    <StyledTr
      $transform={style.transform}
      $transition={style.transition}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children}
    </StyledTr>
  );
};

SortableItem.displayName = 'SortableItem';
export default SortableItem;
