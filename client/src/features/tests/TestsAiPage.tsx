import type { JSX } from 'react';
import { useRef } from 'react';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import IconButton from '@components/ui/button/icon-button/IconButton';
import { CopyIcon } from '@components/ui/icons/CopyIcon';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import useSnackbar from '@features/app/snackbar/useSnackbar';
import SubjectMenu from '@features/generic/SubjectMenu';
import Layout from '@features/layouts/layout/Layout';
import type { Test } from '@site8/shared';
import useTestsAi from './useTestsAi';
import styled from 'styled-components';

type CodeBlockProps = {
  readonly code: string;
};

const CodeBlock = ({ code }: CodeBlockProps): JSX.Element => {
  const codeRef = useRef<HTMLElement>(null);
  const { setErrorMessage, setMessage } = useSnackbar();

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: 'clipboard-write' as PermissionName,
      });
      if (
        permissionStatus.state === 'granted' ||
        permissionStatus.state === 'prompt'
      ) {
        await navigator.clipboard.writeText(text);
        setMessage('Copied to clipboard');
      } else {
        setErrorMessage('Copy to clipboard is not supported');
      }
    } catch {
      setErrorMessage('Failed to copy');
    }
  };

  const handleCopy = (): void => {
    const text = codeRef.current?.textContent;
    if (text && text.trim().length > 0) {
      void copyToClipboard(text);
    }
  };

  return (
    <CodeBlockContainer>
      <CodeHeader>
        <CodeLabel>Code</CodeLabel>
        <IconButton
          aria-label="Copy code to clipboard"
          onClick={handleCopy}
        >
          <CopyIcon isAriaHidden />
        </IconButton>
      </CodeHeader>
      <CodeContent>
        <code ref={codeRef}>{code}</code>
      </CodeContent>
    </CodeBlockContainer>
  );
};

const TestsAiPage = (): JSX.Element => {
  const { data, error, isError, isLoading } = useTestsAi();

  const pageTitle = 'Quality Code';

  return (
    <>
      <Meta title={pageTitle} />
      <Layout.TwoColumn>
        <Layout.Menu>
          <SubjectMenu />
        </Layout.Menu>
        <Layout.Content>
          <LoadingWrapper
            error={error}
            isError={isError}
            isLoading={isLoading}
          >
            <Layout.Article>
              <PageTitle title={pageTitle} />
              <Layout.Section>
                <TestsContainer>
                  {data?.groups
                    ?.filter((group) => group.items && group.items.length > 0)
                    .map((group) => (
                      <GroupSection key={group.id}>
                        <GroupTitle>{group.name}</GroupTitle>
                        <TestList>
                          {group.items?.map((item: Test) => (
                            <TestItem key={item.id}>
                              <TestItemHeader>
                                <TestItemName>{item.name}</TestItemName>
                                {item.tags && item.tags.length > 0 ? (
                                  <TagsContainer>
                                    {item.tags.map((tag: string) => (
                                      <Tag key={tag}>{tag}</Tag>
                                    ))}
                                  </TagsContainer>
                                ) : null}
                              </TestItemHeader>
                              {item.code != null && item.code !== '' ? (
                                <CodeBlock code={item.code} />
                              ) : null}
                              {item.comments ? (
                                <TestComments>{item.comments}</TestComments>
                              ) : null}
                              <TestMeta>
                                <MetaItem>ID: {item.id}</MetaItem>
                              </TestMeta>
                            </TestItem>
                          ))}
                        </TestList>
                      </GroupSection>
                    ))}
                </TestsContainer>
              </Layout.Section>
            </Layout.Article>
          </LoadingWrapper>
        </Layout.Content>
      </Layout.TwoColumn>
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

const CodeBlockContainer = styled.div`
  margin: 0.5rem 0;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const CodeHeader = styled.div`
  background: var(--palette-kbd);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--border-light);
`;

const CodeLabel = styled.span`
  font-size: 0.75rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-secondary-color);
  text-transform: uppercase;
`;

const CodeContent = styled.pre`
  margin: 0;
  padding: 0.75rem;
  background: var(--palette-dark-background);
  color: var(--palette-dark-text);
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;

  code {
    font-family: inherit;
  }
`;

const TestComments = styled.p`
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: var(--background-color);
  border-left: 3px solid var(--status-info);
  color: var(--text-secondary-color);
  font-size: 0.85rem;
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
