import { type JSX, useMemo } from 'react';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import SubjectMenu from '@features/generic/SubjectMenu';
import Layout from '@features/layouts/layout/Layout';
import useTestsAi from './useTestsAi';
import styled from 'styled-components';

type GroupedTest = {
  readonly groupName?: string;
  readonly items: {
    readonly id: number;
    readonly level?: string;
    readonly name: string;
    readonly notes?: string;
    readonly prompt?: string;
    readonly tags?: string[];
    readonly type?: string;
  }[];
};

const TestsAiPage = (): JSX.Element => {
  const { data, error, isError, isLoading } = useTestsAi();

  const pageTitle = 'AI Tests';

  // Group tests by their group names
  const groupedTests = useMemo(() => {
    if (!data?.items) {
      return [];
    }

    const groups = new Map<string, GroupedTest['items']>();

    for (const item of data.items) {
      // Get group name from groups array if available
      const groupId = item.groupIds?.[0];
      const group = data.groups?.find((g) => g.id === groupId);
      const groupName = group?.name ?? 'Other';

      if (!groups.has(groupName)) {
        groups.set(groupName, []);
      }
      groups.get(groupName)?.push(item);
    }

    // Convert to array and sort by group name
    return Array.from(groups.entries())
      .map(([groupName, items]) => ({ groupName, items }))
      .toSorted((a, b) => a.groupName.localeCompare(b.groupName));
  }, [data]);

  return (
    <>
      <Meta title={pageTitle} />
      <Layout.Main>
        <Layout.Menu>
          <SubjectMenu />
        </Layout.Menu>
        <Layout.Article>
          <LoadingWrapper
            error={error}
            isError={isError}
            isLoading={isLoading}
          >
            <PageTitle title={pageTitle} />
            <Layout.Section>
              <TestsContainer>
                {groupedTests.map((group) => (
                  <GroupSection key={group.groupName}>
                    <GroupTitle>{group.groupName}</GroupTitle>
                    <TestList>
                      {group.items.map((item) => (
                        <TestItem key={item.id}>
                          <TestItemHeader>
                            <TestItemName>{item.name}</TestItemName>
                            {item.tags && item.tags.length > 0 ? (
                              <TagsContainer>
                                {item.tags.map((tag) => (
                                  <Tag key={tag}>{tag}</Tag>
                                ))}
                              </TagsContainer>
                            ) : null}
                          </TestItemHeader>
                          {item.prompt ? (
                            <TestPrompt>{item.prompt}</TestPrompt>
                          ) : null}
                          {item.notes ? (
                            <TestNotes>{item.notes}</TestNotes>
                          ) : null}
                          <TestMeta>
                            {item.type ? (
                              <MetaItem>Type: {item.type}</MetaItem>
                            ) : null}
                            {item.level ? (
                              <MetaItem>Level: {item.level}</MetaItem>
                            ) : null}
                            <MetaItem>ID: {item.id}</MetaItem>
                          </TestMeta>
                        </TestItem>
                      ))}
                    </TestList>
                  </GroupSection>
                ))}
              </TestsContainer>
            </Layout.Section>
          </LoadingWrapper>
        </Layout.Article>
      </Layout.Main>
    </>
  );
};

export default TestsAiPage;

const TestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const GroupSection = styled.section`
  background: var(--surface-background-color);
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
`;

const GroupTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-light);
`;

const TestList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TestItem = styled.li`
  background: var(--hover-background);
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: var(--shadow-sm);
  }
`;

const TestItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const TestItemName = styled.h3`
  font-size: 1.1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);
  margin: 0;
  flex: 1;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  padding: 0.25rem 0.5rem;
  background: var(--status-info);
  color: var(--text-inverted-color);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
`;

const TestPrompt = styled.p`
  margin: 0.5rem 0;
  color: var(--text-primary-color);
  line-height: 1.5;
`;

const TestNotes = styled.p`
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: var(--background-color);
  border-left: 3px solid var(--status-warning);
  color: var(--text-secondary-color);
  font-size: 0.9rem;
  font-style: italic;
  border-radius: 4px;
`;

const TestMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-light);
`;

const MetaItem = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary-color);
`;
