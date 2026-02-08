import type { JSX } from 'react';

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
} from '../TestsPage.styles';
import TestItem from './TestItem';

type TestsSectionsListProps = {
  readonly error?: Error | null;
  readonly onEditItem: (item: Test, groupId: number) => void;
  readonly sections: readonly TestSection[];
};

const TestsSectionsList = ({
  error,
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
        <div key={section.id}>
          {section.name ? <SectionTitle>{section.name}</SectionTitle> : null}
          {section.description ? (
            <SectionDescription>{section.description}</SectionDescription>
          ) : null}
          {section.groups
            ?.filter((group) => group.items && group.items.length > 0)
            .map((group) => (
              <GroupSection key={group.id}>
                <GroupTitle>{group.name}</GroupTitle>
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
        </div>
      ))}
    </TestsContainer>
  );
};

export default TestsSectionsList;
