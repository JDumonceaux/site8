import type { JSX } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import useSnackbar from '@features/app/snackbar/useSnackbar';
import Layout from '@features/layouts/layout/Layout';
import {
  ENDPOINT_TEST_DELETE,
  ENDPOINT_TEST_UPDATE,
} from '@lib/utils/constants';
import type { Test, TestsSection } from '@site8/shared';
import SectionsGroupsList from './components/SectionsGroupsList';
import SectionsGroupsSkeleton from './components/SectionsGroupsSkeleton';
import TestsList from './components/TestsList';
import TestsSectionsList from './components/TestsSectionsList';
import TestsSkeleton from './components/TestsSkeleton';
import TestItemEditDialog from './edit/dialog/TestItemEditDialog';
import { useTestFilters } from './hooks/useTestFilters';
import {
  FilterGroup,
  FilterLabel,
  FilterSection,
  FilterSelect,
  FilterTitle,
  ToggleInput,
  ToggleRow,
  ToggleText,
} from './TestsPage.styles';
import useTests from './useTests';
import useTestsList from './useTestsList';
import useTestsSections from './useTestsSections';

const TestsPage = (): JSX.Element => {
  const {
    data: groupedData,
    error: groupedError,
    isError: isGroupedError,
    isLoading: isGroupedLoading,
  } = useTests();
  const {
    data: listData,
    error: listError,
    isError: isListError,
    isLoading: isListLoading,
  } = useTestsList();
  const { data: sectionsData, isLoading: isSectionsLoading } =
    useTestsSections();
  const [editingItem, setEditingItem] = useState<null | Test>(null);
  const [editingGroupId, setEditingGroupId] = useState<null | number>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGrouped, setIsGrouped] = useState(() => {
    const stored = localStorage.getItem('testsViewGrouped');
    return stored === 'false' ? false : true;
  });
  const { setErrorMessage, setMessage } = useSnackbar();

  useEffect(() => {
    localStorage.setItem('testsViewGrouped', String(isGrouped));
  }, [isGrouped]);

  const pageTitle = 'Quality Code';

  const sections = useMemo(
    () => groupedData?.sections ?? [],
    [groupedData?.sections],
  );

  const allSections = useMemo<TestsSection[]>(
    () => sectionsData?.items ?? [],
    [sectionsData?.items],
  );

  const {
    allTags,
    filteredSections,
    sectionFilter,
    sectionNames,
    setSectionFilter,
    setTagFilter,
    tagFilter,
  } = useTestFilters(sections);

  const itemGroupIdMap = useMemo(() => {
    const map = new Map<number, number>();
    for (const section of sections) {
      for (const group of section.groups ?? []) {
        for (const item of group.items ?? []) {
          map.set(item.id, group.id);
        }
      }
    }
    return map;
  }, [sections]);

  const listItems = useMemo(() => listData?.items ?? [], [listData?.items]);

  const activeError = isGrouped ? groupedError : listError;
  const activeIsError = isGrouped ? isGroupedError : isListError;
  const activeIsLoading = isGrouped ? isGroupedLoading : isListLoading;

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

  const handleMoveItem = useCallback(
    async (itemId: number, newGroupId: number, currentGroupId: number) => {
      if (newGroupId === currentGroupId) {
        return;
      }

      try {
        const response = await fetch(ENDPOINT_TEST_UPDATE(itemId), {
          body: JSON.stringify({
            groupId: newGroupId,
            item: {},
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        });

        if (!response.ok) {
          throw new Error('Failed to move item');
        }

        setMessage('Item moved successfully');

        // Refresh the data
        globalThis.location.reload();
      } catch (error_) {
        const errorMessage =
          error_ instanceof Error ? error_.message : 'Unknown error';
        setErrorMessage(`Failed to move item: ${errorMessage}`);
      }
    },
    [setMessage, setErrorMessage],
  );

  return (
    <>
      <Meta title={pageTitle} />
      <Layout.TwoColumn>
        <Layout.Menu>
          {isGrouped ? (
            isSectionsLoading ? (
              <SectionsGroupsSkeleton />
            ) : (
              <SectionsGroupsList
                onMoveItem={(itemId, newGroupId, currentGroupId) => {
                  void handleMoveItem(itemId, newGroupId, currentGroupId);
                }}
                sections={allSections}
              />
            )
          ) : null}
          <FilterSection>
            <FilterTitle>Filters</FilterTitle>
            <ToggleRow>
              <ToggleInput
                checked={isGrouped}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setIsGrouped(event.target.checked);
                }}
                type="checkbox"
              />
              <ToggleText>Grouped</ToggleText>
            </ToggleRow>
            <FilterGroup>
              <FilterLabel htmlFor="section-filter">Section:</FilterLabel>
              <FilterSelect
                disabled={!isGrouped}
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
                disabled={!isGrouped}
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
            error={activeError}
            fallback={<TestsSkeleton />}
            isError={activeIsError}
            isLoading={activeIsLoading}
            loadingText="Loading tests..."
          >
            <Layout.Article>
              <PageTitle title={pageTitle} />
              <Layout.Section>
                {isGrouped ? (
                  <TestsSectionsList
                    onEditItem={handleEditItem}
                    sections={filteredSections}
                  />
                ) : (
                  <TestsList
                    itemGroupIdMap={itemGroupIdMap}
                    items={listItems}
                    onEditItem={handleEditItem}
                  />
                )}
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
