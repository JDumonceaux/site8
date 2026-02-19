import type { JSX } from 'react';
import { useState } from 'react';

import { EditIcon } from '@components/icons/EditIcon';
import {
  EditIconButton,
  MetaItem,
  TestItem as StyledTestItem,
  Tag,
  TagsContainer,
  TestComments,
  TestItemHeader,
  TestItemName,
  TestMeta,
  ToggleButton,
} from '@features/tests/TestsPage.styles';
import type { Test } from '@site8/shared';
import CodeBlock from './CodeBlock';

type TestItemProps = {
  readonly groupId: number;
  readonly item: Test;
  readonly onEdit: (item: Test, groupId: number) => void;
};

const TestItem = ({ groupId, item, onEdit }: TestItemProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = (): void => {
    setIsExpanded((prev) => !prev);
  };

  const handleEdit = (): void => {
    onEdit(item, groupId);
  };

  const handleDragStart = (event: React.DragEvent<HTMLLIElement>): void => {
    event.dataTransfer.setData(
      'application/json',
      JSON.stringify({ currentGroupId: groupId, itemId: item.id }),
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <StyledTestItem
      draggable
      onDragStart={handleDragStart}
    >
      <TestItemHeader>
        <ToggleButton
          onClick={toggleExpanded}
          type="button"
        >
          {isExpanded ? '▼' : '▶'}
        </ToggleButton>
        <TestItemName onClick={toggleExpanded}>{item.name}</TestItemName>
        {item.tags && item.tags.length > 0 ? (
          <TagsContainer>
            {item.tags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagsContainer>
        ) : null}
        <EditIconButton
          aria-label="Edit test item"
          onClick={handleEdit}
        >
          <EditIcon isAriaHidden />
        </EditIconButton>
      </TestItemHeader>
      {isExpanded ? (
        <>
          {item.code != null && item.code.length > 0 ? (
            <>
              {item.code.map((codeBlock) => (
                <CodeBlock
                  code={codeBlock.content}
                  key={codeBlock.id}
                  type={codeBlock.type}
                />
              ))}
            </>
          ) : null}
          {item.comments ? <TestComments>{item.comments}</TestComments> : null}
          <TestMeta>
            <MetaItem>ID: {item.id}</MetaItem>
          </TestMeta>
        </>
      ) : null}
    </StyledTestItem>
  );
};

export default TestItem;
