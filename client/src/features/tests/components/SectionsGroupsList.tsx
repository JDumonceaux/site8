import type { JSX } from 'react';
import { useCallback, useState } from 'react';

import type { TestsSection, TestsSectionGroup } from '@site8/shared';
import styled from 'styled-components';

type SectionsGroupsListProps = {
  readonly onMoveItem?: (
    itemId: number,
    newGroupId: number,
    currentGroupId: number,
  ) => void;
  readonly sections: readonly TestsSection[];
};

const SectionsGroupsList = ({
  onMoveItem,
  sections,
}: SectionsGroupsListProps): JSX.Element => {
  const [dragOverGroupId, setDragOverGroupId] = useState<null | number>(null);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLLIElement>): void => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    [],
  );

  const handleDragLeave = useCallback((): void => {
    setDragOverGroupId(null);
  }, []);

  if (sections.length === 0) {
    return <Container>No sections available.</Container>;
  }

  return (
    <Container>
      <Title>Sections & Groups</Title>
      <List>
        {sections.map((section) => (
          <SectionItem key={section.id}>
            <SectionName>{section.name}</SectionName>
            {section.groups.length > 0 ? (
              <GroupList>
                {section.groups.map((group: TestsSectionGroup) => {
                  const handleDragEnter = (
                    event: React.DragEvent<HTMLLIElement>,
                  ): void => {
                    event.preventDefault();
                    setDragOverGroupId(group.id);
                  };

                  const handleDrop = (
                    event: React.DragEvent<HTMLLIElement>,
                  ): void => {
                    event.preventDefault();
                    setDragOverGroupId(null);

                    try {
                      const data = JSON.parse(
                        event.dataTransfer.getData('application/json'),
                      ) as { currentGroupId: number; itemId: number };
                      if (
                        data.itemId &&
                        data.currentGroupId !== group.id &&
                        onMoveItem
                      ) {
                        onMoveItem(data.itemId, group.id, data.currentGroupId);
                      }
                    } catch {
                      // Invalid drag data
                    }
                  };

                  return (
                    <GroupItem
                      $isDropTarget={dragOverGroupId === group.id}
                      key={group.id}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <GroupName>{group.name}</GroupName>
                      <ItemCount>({group.itemCount})</ItemCount>
                    </GroupItem>
                  );
                })}
              </GroupList>
            ) : (
              <EmptyMessage>No groups</EmptyMessage>
            )}
          </SectionItem>
        ))}
      </List>
    </Container>
  );
};

export default SectionsGroupsList;

const Container = styled.div`
  position: sticky;
  top: 60px;
  z-index: 10;
  margin-top: 0;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: var(--surface-background-color, #fff);
  border: 1px solid var(--border-light);
  border-radius: 0.5rem;
  max-height: calc(100vh - 5rem);
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary, #333);
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SectionItem = styled.li`
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionName = styled.div`
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-primary, #333);
  margin-bottom: 0.25rem;
`;

const GroupList = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0.75rem;
`;

const GroupItem = styled.li<{ $isDropTarget?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.625rem 0.875rem;
  margin: 0.0625rem 0;
  font-size: 0.75rem;
  color: var(--color-text-secondary, #666);
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  ${(props) =>
    props.$isDropTarget
      ? `
    background-color: var(--status-info-light, #e3f2fd);
    border: 2px dashed var(--status-info, #2196f3);
  `
      : ''}

  &:hover {
    background-color: var(--color-background-hover, #e8e8e8);
  }
`;

const GroupName = styled.span`
  flex: 1;
`;

const ItemCount = styled.span`
  font-size: 0.6875rem;
  color: var(--color-text-tertiary, #999);
`;

const EmptyMessage = styled.div`
  padding-left: 0.75rem;
  font-size: 0.75rem;
  color: var(--color-text-tertiary, #999);
  font-style: italic;
`;
