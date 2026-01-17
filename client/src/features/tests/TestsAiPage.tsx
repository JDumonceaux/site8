import type { JSX } from 'react';
import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import IconButton from '@components/ui/button/icon-button/IconButton';
import { CopyIcon } from '@components/ui/icons/CopyIcon';
import { EditIcon } from '@components/ui/icons/EditIcon';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import useSnackbar from '@features/app/snackbar/useSnackbar';
import SubjectMenu from '@features/generic/SubjectMenu';
import Layout from '@features/layouts/layout/Layout';
import type { Test, TestSection } from '@site8/shared';
import TestItemEditDialog from './edit/dialog/TestItemEditDialog';
import useTestGroups from './useTestGroups';
import useTestsAi from './useTestsAi';
import styled from 'styled-components';

type CodeBlockProps = {
  readonly code: string;
};

type TestItemComponentProps = {
  readonly item: Test;
  readonly groupId: number;
  readonly onEdit: (item: Test, groupId: number) => void;
};

const TestItemComponent = ({
  item,
  groupId,
  onEdit,
}: TestItemComponentProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = (): void => {
    setIsExpanded((prev) => !prev);
  };

  const handleEdit = (): void => {
    onEdit(item, groupId);
  };

  return (
    <TestItem>
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
              {item.code
                .toSorted((a, b) => a.seq - b.seq)
                .map((codeBlock) => (
                  <CodeBlock
                    code={codeBlock.content}
                    key={codeBlock.id}
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
    </TestItem>
  );
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
  const { groups: allGroups } = useTestGroups();
  const [editingItem, setEditingItem] = useState<null | Test>(null);
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setMessage } = useSnackbar();

  const pageTitle = 'Quality Code';

  const sections: readonly TestSection[] = data?.sections ?? [];

  const handleEditItem = useCallback((item: Test, groupId: number) => {
    setEditingItem(item);
    setEditingGroupId(groupId);
    setIsDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setEditingGroupId(null);
  }, []);

  const handleSaveItem = useCallback(
    (updatedItem: Test, groupId: number) => {
      // TODO: Implement actual save logic (API call)
      console.log('Saving item:', updatedItem, 'to group:', groupId);
      setMessage('Item updated (save functionality to be implemented)');
      handleCloseDialog();
    },
    [setMessage, handleCloseDialog],
  );

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
              <EditLinkContainer>
                <EditLink to="/tests/ai/edit">Edit Mode</EditLink>
              </EditLinkContainer>
              <Layout.Section>
                <TestsContainer>
                  {sections
                    .filter(
                      (section) => section.groups && section.groups.length > 0,
                    )
                    .map((section) => (
                      <div key={section.id}>
                        {section.name ? (
                          <SectionTitle>{section.name}</SectionTitle>
                        ) : null}
                        {section.description ? (
                          <SectionDescription>
                            {section.description}
                          </SectionDescription>
                        ) : null}
                        {section.groups
                          ?.filter(
                            (group) => group.items && group.items.length > 0,
                          )
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
                                  <TestItemComponent
                                    groupId={group.id}
                                    item={item}
                                    key={item.id}
                                    onEdit={handleEditItem}
                                  />
                                ))}
                              </TestList>
                            </GroupSection>
                          ))}
                      </div>
                    ))}
                </TestsContainer>
              </Layout.Section>
            </Layout.Article>
          </LoadingWrapper>
        </Layout.Content>
      </Layout.TwoColumn>
      <TestItemEditDialog
        availableGroups={allGroups}
        groupId={editingGroupId}
        isOpen={isDialogOpen}
        item={editingItem}
        key={editingItem?.id ?? 'new'}
        onClose={handleCloseDialog}
        onSave={handleSaveItem}
      />
    </>
  );
};

export default TestsAiPage;

const TestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: var(--font-weight-bold);
  color: var(--text-primary-color);
  margin: 0 0 0.5rem 0;
`;

const SectionDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary-color);
  margin: 0 0 1.5rem 0;
`;

const GroupSection = styled.section`
  background: var(--surface-background-color);
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
`;

const GroupTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-light);
`;

const GroupComments = styled.p`
  margin: 0 0 1rem 0;
  padding: 0.75rem;
  background: var(--background-color);
  border-left: 3px solid var(--status-warning);
  color: var(--text-secondary-color);
  font-size: 0.9rem;
  border-radius: 4px;
  font-style: italic;
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
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: var(--shadow-sm);
  }
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

const TestItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const EditIconButton = styled(IconButton)`
  color: var(--text-secondary-color);
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);

  &:hover:not(:disabled) {
    color: var(--status-info);
    background-color: var(--hover-background);
  }

  &:focus {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
    border-radius: var(--border-radius-sm);
  }

  i {
    display: block;
  }
`;

const TestItemName = styled.div`
  flex: 1;
  font-size: 1.1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);
  cursor: pointer;
  padding: 0.25rem 0;
  margin: 0;

  &:hover {
    color: var(--status-info);
  }
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
  background: #2d2d2d;
  color: #e0e0e0;
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

const EditLinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--surface-background-color);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-light);
`;

const EditLink = styled(Link)`
  padding: 0.75rem 1.5rem;
  background: var(--status-info);
  color: var(--text-inverted-color);
  text-decoration: none;
  border-radius: var(--border-radius-sm);
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  transition:
    background 0.2s ease,
    transform 0.1s ease;

  &:hover {
    background: var(--status-info-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid var(--status-info);
    outline-offset: 2px;
  }
`;
