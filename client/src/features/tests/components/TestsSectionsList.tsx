import type { JSX } from 'react';

import IconButton from '@components/button/icon-button/IconButton';
import { AddIcon } from '@components/icons';
import type { Test, TestSection } from '@site8/shared';
import {
  GroupComments,
  GroupSection,
  GroupTitle,
  SectionDescription,
  SectionTitle,
  Tag,
  TagsContainer,
  TestList,
  TestsContainer,
} from '@features/tests/TestsPage.styles';
import TestItem from './TestItem';
import styled from 'styled-components';

type TestsSectionsListProps = {
  readonly error?: Error | null;
  readonly onAddItem: (groupId: number) => void;
  readonly onEditItem: (item: Test, groupId: number) => void;
  readonly sections: readonly TestSection[];
};

const TestsSectionsList = ({
  error,
  onAddItem,
  onEditItem,
  sections,
}: TestsSectionsListProps): JSX.Element => {
  const visibleSections = sections.filter(
    (section) => section.groups && section.groups.length > 0,
  );

  if (visibleSections.length === 0) {
    return (
      <TestsContainer>
        {error ? 'Failed to fetch' : 'No tests match the current filters.'}
      </TestsContainer>
    );
  }

  return (
    <TestsContainer>
      {visibleSections.map((section) => (
        <SectionContainer
          id={`tests-section-${section.id}`}
          key={section.id}
        >
          <SectionHeaderRow>
            {section.name ? <SectionTitle>{section.name}</SectionTitle> : null}
            <IconButton
              aria-label={`Add test to ${section.name ?? 'section'}`}
              onClick={() => {
                const defaultGroupId = section.groups?.[0]?.id;
                if (defaultGroupId) {
                  onAddItem(defaultGroupId);
                }
              }}
            >
              <AddIcon />
            </IconButton>
          </SectionHeaderRow>
          {section.description ? (
            <SectionDescription>{section.description}</SectionDescription>
          ) : null}
          {section.groups
            ?.filter((group) => group.items && group.items.length > 0)
            .map((group) => (
              <GroupSection key={group.id}>
                <GroupTitleRow>
                  <GroupTitle>{group.name}</GroupTitle>
                  <IconButton
                    aria-label="Add test to group"
                    onClick={() => {
                      onAddItem(group.id);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </GroupTitleRow>
                {group.tags && group.tags.length > 0 ? (
                  <TagsContainer>
                    {group.tags.map((tag: string) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagsContainer>
                ) : null}
                {group.comments ? (
                  <GroupComments>{group.comments}</GroupComments>
                ) : null}
                <TestList>
                  {group.items?.map((item: Test) => (
                    <TestItem
                      groupId={group.id}
                      item={item}
                      key={item.id}
                      onEdit={onEditItem}
                    />
                  ))}
                </TestList>
              </GroupSection>
            ))}
        </SectionContainer>
      ))}
    </TestsContainer>
  );
};

export default TestsSectionsList;

const SectionHeaderRow = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
`;

const GroupTitleRow = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
`;

const SectionContainer = styled.div`
  scroll-margin-top: 5rem;
`;
