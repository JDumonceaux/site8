import type { JSX } from 'react';
import { useCallback, useMemo } from 'react';

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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Test, TestGroup } from '@site8/shared';
import EditableTestItem from './EditableTestItem';
import styled from 'styled-components';

type EditableGroupProps = {
  readonly group: TestGroup;
  readonly onUpdate: (updatedGroup: TestGroup) => void;
};

const EditableGroup = ({
  group,
  onUpdate,
}: EditableGroupProps): JSX.Element => {
  const items = useMemo(() => group.items ?? [], [group.items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent): void => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const reorderedItems = arrayMove(items, oldIndex, newIndex);
        // Update seq values based on new order
        const updatedItems = reorderedItems.map((item, index) => ({
          ...item,
          seq: index + 1,
        }));

        // Propagate changes up immediately
        onUpdate({
          ...group,
          items: updatedItems,
        });
      }
    },
    [group, items, onUpdate],
  );

  const handleItemUpdate = useCallback(
    (updatedItem: Test): void => {
      const updatedItems = items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      );

      // Propagate changes up
      onUpdate({
        ...group,
        items: updatedItems,
      });
    },
    [group, items, onUpdate],
  );

  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    onUpdate({ ...group, name: event.target.value });
  };

  const handleGroupCommentsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    onUpdate({ ...group, comments: event.target.value });
  };

  return (
    <GroupSection>
      <EditableField>
        <GroupTitleInput
          onChange={handleGroupNameChange}
          placeholder="Group name"
          type="text"
          value={group.name}
        />
      </EditableField>

      {group.comments != null && group.comments.length > 0 ? (
        <EditableField>
          <EditableTextarea
            onChange={handleGroupCommentsChange}
            placeholder="Group comments..."
            rows={2}
            value={group.comments}
          />
        </EditableField>
      ) : null}

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <TestList>
            {items.map((item) => (
              <EditableTestItem
                item={item}
                key={item.id}
                onUpdate={handleItemUpdate}
              />
            ))}
          </TestList>
        </SortableContext>
      </DndContext>
    </GroupSection>
  );
};

export default EditableGroup;

// Styled Components

const GroupSection = styled.section`
  background: var(--surface-background-color);
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const TestList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EditableField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const EditableInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-sm);
  background: var(--background-color);
  color: var(--text-primary-color);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--status-info);
  }

  &::placeholder {
    color: var(--text-tertiary-color);
  }
`;

const GroupTitleInput = styled(EditableInput)`
  font-size: 1.5rem;
  font-weight: var(--font-weight-semibold);
`;

const EditableTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-sm);
  background: var(--background-color);
  color: var(--text-primary-color);
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--status-info);
  }

  &::placeholder {
    color: var(--text-tertiary-color);
  }
`;
