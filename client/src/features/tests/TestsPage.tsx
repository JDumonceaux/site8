import type { JSX } from 'react';
import { useCallback, useState } from 'react';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import useSnackbar from '@features/app/snackbar/useSnackbar';
import Layout from '@features/layouts/layout/Layout';
import {
  ENDPOINT_TEST_DELETE,
  ENDPOINT_TEST_UPDATE,
} from '@lib/utils/constants';
import type { Test } from '@site8/shared';
import TestItem from './components/TestItem';
import TestItemEditDialog from './edit/dialog/TestItemEditDialog';
import { useTestFilters } from './hooks/useTestFilters';
import {
  FilterGroup,
  FilterLabel,
  FilterSection,
  FilterSelect,
  FilterTitle,
  GroupComments,
  GroupSection,
  GroupTitle,
  SectionDescription,
  SectionTitle,
  Tag,
  TagsContainer,
  TestList,
  TestsContainer,
} from './TestsPage.styles';
import useTests from './useTests';

const TestsPage = (): JSX.Element => {
  const { data, error, isError, isLoading } = useTests();
  const [editingItem, setEditingItem] = useState<null | Test>(null);
  const [editingGroupId, setEditingGroupId] = useState<null | number>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setErrorMessage, setMessage } = useSnackbar();

  const pageTitle = 'Quality Code';

  const sections = data?.sections ?? [];

  const {
    allTags,
    filteredSections,
    sectionFilter,
    sectionNames,
    setSectionFilter,
    setTagFilter,
    tagFilter,
  } = useTestFilters(sections);

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
    async (updatedItem: Test, groupId: number) => {
      try {
        const response = await fetch(ENDPOINT_TEST_UPDATE(updatedItem.id), {
          body: JSON.stringify({
            groupId,
            item: {
              comments: updatedItem.comments,
              name: updatedItem.name,
              tags: updatedItem.tags,
            },
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        });

        if (!response.ok) {
          throw new Error('Failed to update item');
        }

        setMessage('Item updated successfully');
        handleCloseDialog();

        // Refresh the data
        globalThis.location.reload();
      } catch (error_) {
        const errorMessage =
          error_ instanceof Error ? error_.message : 'Unknown error';
        setMessage(`Failed to update item: ${errorMessage}`);
      }
    },
    [setMessage, handleCloseDialog],
  );

  const handleDeleteItem = useCallback(
    async (itemId: number) => {
      try {
        const response = await fetch(ENDPOINT_TEST_DELETE(itemId), {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete item');
        }

        setMessage('Item deleted successfully');
        handleCloseDialog();

        // Refresh the data
        globalThis.location.reload();
      } catch (error_) {
        const errorMessage =
          error_ instanceof Error ? error_.message : 'Unknown error';
        setMessage(`Failed to delete item: ${errorMessage}`);
      }
    },
    [setMessage, handleCloseDialog],
  );

  return (
    <>
      <Meta title={pageTitle} />
      <Layout.TwoColumn>
        <Layout.Menu>
          <FilterSection>
            <FilterTitle>Filters</FilterTitle>
            <FilterGroup>
              <FilterLabel htmlFor="section-filter">Section:</FilterLabel>
              <FilterSelect
                id="section-filter"
                onChange={(e) => {
                  setSectionFilter(e.target.value);
                }}
                value={sectionFilter}
              >
                <option value="all">All Sections</option>
                {sectionNames.map((name) => (
                  <option
                    key={name}
                    value={name}
                  >
                    {name}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel htmlFor="tag-filter">Tag:</FilterLabel>
              <FilterSelect
                id="tag-filter"
                onChange={(e) => {
                  setTagFilter(e.target.value);
                }}
                value={tagFilter}
              >
                <option value="all">All Tags</option>
                {allTags.map((tag) => (
                  <option
                    key={tag}
                    value={tag}
                  >
                    {tag}
                  </option>
                ))}
              </FilterSelect>
            </FilterGroup>
          </FilterSection>
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
                  {filteredSections
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
                                  <TestItem
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
        groupId={editingGroupId}
        isOpen={isDialogOpen}
        item={editingItem}
        key={editingItem?.id ?? 'new'}
        onClose={handleCloseDialog}
        onDelete={(itemId) => {
          void (async () => {
            try {
              await handleDeleteItem(itemId);
            } catch (deleteError: unknown) {
              const errorMessage =
                deleteError instanceof Error
                  ? deleteError.message
                  : 'Failed to delete item';
              setErrorMessage(errorMessage);
            }
          })();
        }}
        onSave={(item, groupId) => {
          void (async () => {
            try {
              await handleSaveItem(item, groupId);
            } catch (saveError: unknown) {
              const errorMessage =
                saveError instanceof Error
                  ? saveError.message
                  : 'Failed to save item';
              setErrorMessage(errorMessage);
            }
          })();
        }}
      />
    </>
  );
};

export default TestsPage;
