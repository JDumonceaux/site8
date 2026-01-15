import type { JSX } from 'react';
import { useState } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Test } from '@site8/shared';
import CodeBlock from './CodeBlock';
import styled from 'styled-components';

type EditableTestItemProps = {
  readonly item: Test;
  readonly onUpdate: (updatedItem: Test) => void;
};

const EditableTestItem = ({
  item,
  onUpdate,
}: EditableTestItemProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    onUpdate({ ...item, name: event.target.value });
  };

  const handleCommentsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    onUpdate({ ...item, comments: event.target.value });
  };

  const handleTagsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const tagsString = event.target.value;
    const tags = tagsString
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    onUpdate({ ...item, tags });
  };

  const toggleExpanded = (): void => {
    setIsExpanded((prev) => !prev);
  };

  const inlineStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <DraggableTestItem
      $isDragging={isDragging}
      $transform={inlineStyle.transform}
      $transition={inlineStyle.transition}
      ref={setNodeRef}
      {...attributes}
    >
      <DragHandle {...listeners}>⋮⋮</DragHandle>
      <TestItemContent>
        <TestItemHeader>
          <ToggleButton
            onClick={toggleExpanded}
            type="button"
          >
            {isExpanded ? '▼' : '▶'}
          </ToggleButton>
          <ItemName onClick={toggleExpanded}>
            {item.name || 'Untitled'}
          </ItemName>
        </TestItemHeader>

        {isExpanded ? (
          <>
            <EditableField>
              <Label>Name</Label>
              <EditableInput
                onChange={handleNameChange}
                placeholder="Test name"
                type="text"
                value={item.name}
              />
            </EditableField>

            <EditableField>
              <Label>Tags (comma-separated)</Label>
              <EditableInput
                onChange={handleTagsChange}
                placeholder="tag1, tag2, tag3"
                type="text"
                value={item.tags?.join(', ') ?? ''}
              />
            </EditableField>

            {item.code != null && item.code.length > 0 ? (
              <CodeBlocksContainer>
                {item.code
                  .toSorted((a, b) => a.seq - b.seq)
                  .map((codeBlock) => (
                    <CodeBlock
                      code={codeBlock.content}
                      key={codeBlock.id}
                    />
                  ))}
              </CodeBlocksContainer>
            ) : null}

            <EditableField>
              <Label>Comments</Label>
              <EditableTextarea
                onChange={handleCommentsChange}
                placeholder="Add comments..."
                rows={3}
                value={item.comments ?? ''}
              />
            </EditableField>

            <TestMeta>
              <MetaItem>ID: {item.id}</MetaItem>
              <MetaItem>Seq: {item.seq ?? 'N/A'}</MetaItem>
            </TestMeta>
          </>
        ) : null}
      </TestItemContent>
    </DraggableTestItem>
  );
};

export default EditableTestItem;

// Styled Components

const DraggableTestItem = styled.li<{
  $isDragging?: boolean;
  $transform?: string;
  $transition?: string;
}>`
  background: var(--hover-background);
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  display: flex;
  gap: 0.75rem;
  transition: ${(props) =>
    props.$transition ?? 'box-shadow 0.2s ease, opacity 0.2s ease'};
  cursor: move;
  opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};
  transform: ${(props) => props.$transform ?? 'none'};

  &:hover {
    box-shadow: var(--shadow-sm);
  }
`;

const DragHandle = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-secondary-color);
  cursor: grab;
  font-size: 1.2rem;
  padding: 0.25rem;
  user-select: none;

  &:active {
    cursor: grabbing;
  }
`;

const TestItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TestItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-primary-color);
  }

  &:focus {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const ItemName = styled.div`
  flex: 1;
  font-size: 1.1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);
  cursor: pointer;
  padding: 0.25rem 0;

  &:hover {
    color: var(--status-info);
  }
`;

const EditableField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary-color);
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

const CodeBlocksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TestMeta = styled.div`
  display: flex;
  gap: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-light);
`;

const MetaItem = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary-color);
`;
