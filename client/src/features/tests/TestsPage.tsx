import type { JSX } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import IconButton from '@components/ui/button/icon-button/IconButton';
import { FilterIcon } from '@components/ui/icons';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import useSnackbar from '@features/app/snackbar/useSnackbar';
import Layout from '@features/layouts/layout/Layout';
import type { Test, TestsSection } from '@site8/shared';
import SectionsGroupsList from './components/SectionsGroupsList';
import SectionsGroupsSkeleton from './components/SectionsGroupsSkeleton';
import TestsList from './components/TestsList';
import TestsSectionsList from './components/TestsSectionsList';
import TestsSkeleton from './components/TestsSkeleton';
import TestItemEditDialog from '@features/tests/edit/dialog/TestItemEditDialog';
import { useTestFilters } from './hooks/useTestFilters';
import TestFiltersDialog from './TestFiltersDialog';
import useTestMutations from './useTestMutations';
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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

  const { createTest, deleteTest, moveTest, updateTest } = useTestMutations({
    onCreateError: (error: Error) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setMessage(`Failed to add item: ${errorMessage}`);
    },
    onCreateSuccess: () => {
      setMessage('Item added successfully');
      handleCloseDialog();
    },
    onDeleteError: (error: Error) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setMessage(`Failed to delete item: ${errorMessage}`);
    },
    onDeleteSuccess: () => {
      setMessage('Item deleted successfully');
      handleCloseDialog();
    },
    onMoveError: (error: Error) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setErrorMessage(`Failed to move item: ${errorMessage}`);
    },
    onMoveSuccess: () => {
      setMessage('Item moved successfully');
    },
    onUpdateError: (error: Error) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setMessage(`Failed to update item: ${errorMessage}`);
    },
    onUpdateSuccess: () => {
      setMessage('Item updated successfully');
      handleCloseDialog();
    },
  });

  const handleSaveItem = useCallback(
    (updatedItem: Test, groupId: number) => {
      if (updatedItem.id === 0) {
        createTest({ groupId, item: updatedItem });
        return;
      }

      updateTest({ groupId, item: updatedItem });
    },
    [createTest, updateTest],
  );

  const handleDeleteItem = useCallback(
    (itemId: number) => {
      deleteTest(itemId);
    },
    [deleteTest],
  );

  const handleMoveItem = useCallback(
    (itemId: number, newGroupId: number, currentGroupId: number) => {
      moveTest({ currentGroupId, itemId, newGroupId });
    },
    [moveTest],
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
                onMoveItem={handleMoveItem}
                sections={allSections}
              />
            )
          ) : null}
        </Layout.Menu>
        <Layout.Content>
          <Layout.Article>
            <PageTitle title={pageTitle}>
              <IconButton
                aria-label="Open filters"
                onClick={() => {
                  setIsSettingsOpen(true);
                }}
              >
                <FilterIcon />
              </IconButton>
            </PageTitle>
            <LoadingWrapper
              error={activeError}
              fallback={<TestsSkeleton />}
              isError={activeIsError}
              isLoading={activeIsLoading}
              loadingText="Loading tests..."
            >
              <Layout.Section>
                {isGrouped ? (
                  <TestsSectionsList
                    error={activeError}
                    onAddItem={(groupId) => {
                      setEditingItem(null);
                      setEditingGroupId(groupId);
                      setIsDialogOpen(true);
                    }}
                    onEditItem={handleEditItem}
                    sections={filteredSections}
                  />
                ) : (
                  <TestsList
                    error={activeError}
                    itemGroupIdMap={itemGroupIdMap}
                    items={listItems}
                    onEditItem={handleEditItem}
                  />
                )}
              </Layout.Section>
            </LoadingWrapper>
          </Layout.Article>
        </Layout.Content>
      </Layout.TwoColumn>
      <TestItemEditDialog
        groupId={editingGroupId}
        isOpen={isDialogOpen}
        item={editingItem}
        key={editingItem?.id ?? 'new'}
        onClose={handleCloseDialog}
        onDelete={handleDeleteItem}
        onSave={handleSaveItem}
      />
      <TestFiltersDialog
        allTags={allTags}
        isGrouped={isGrouped}
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
        }}
        sectionFilter={sectionFilter}
        sectionNames={sectionNames}
        setIsGrouped={setIsGrouped}
        setSectionFilter={setSectionFilter}
        setTagFilter={setTagFilter}
        tagFilter={tagFilter}
      />
    </>
  );
};

export default TestsPage;
