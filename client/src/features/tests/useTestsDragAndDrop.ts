import { useState } from 'react';

import { arrayMove } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';

type UseTestsDragAndDropResult = {
  handleDragEnd: (event: DragEndEvent) => void;
  items: number[];
  setItems: React.Dispatch<React.SetStateAction<number[]>>;
};

/**
 * Custom hook to manage drag-and-drop state and logic for test items.
 * Handles reordering of items based on drag events.
 */
const useTestsDragAndDrop = (): UseTestsDragAndDropResult => {
  const [items, setItems] = useState<number[]>([1, 2, 3]);

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((itemsList) => {
        const oldIndex = itemsList.indexOf(active.id as number);
        const newIndex = itemsList.indexOf(over?.id as number);
        return arrayMove(itemsList, oldIndex, newIndex);
      });
    }
  };

  return { handleDragEnd, items, setItems };
};

export default useTestsDragAndDrop;
