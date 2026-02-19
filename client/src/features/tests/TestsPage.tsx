import type { JSX } from 'react';

import IconButton from '@components/button/icon-button/IconButton';
import { FilterIcon } from '@components/icons';
import LoadingWrapper from '@components/loading/LoadingWrapper';
import Meta from '@components/meta/Meta';
import PageTitle from '@components/page/PageTitle';
import Layout from '@features/layouts/layout/Layout';
import TestItemEditDialog from '@features/tests/edit/dialog/TestItemEditDialog';
import SectionsGroupsList from './components/SectionsGroupsList';
import SectionsGroupsSkeleton from './components/SectionsGroupsSkeleton';
import TestsList from './components/TestsList';
import TestsSectionsList from './components/TestsSectionsList';
import TestsSkeleton from './components/TestsSkeleton';
import useTestsPageController from './hooks/useTestsPageController';
import TestFiltersDialog from './TestFiltersDialog';

const TestsPage = (): JSX.Element => {
  const {
    activeError,
    activeIsError,
    activeIsLoading,
    allSections,
    allTags,
    closeDialog,
    deleteItem,
    editingGroupId,
    editingItem,
    editItem,
    filteredSections,
    isDialogOpen,
    isGrouped,
    isSectionsLoading,
    isSettingsOpen,
    itemGroupIdMap,
    listItems,
    moveItem,
    openCreateDialog,
    saveItem,
    sectionFilter,
    sectionNames,
    setIsGrouped,
    setIsSettingsOpen,
    setSectionFilter,
    setTagFilter,
    tagFilter,
  } = useTestsPageController();

  const pageTitle = 'Quality Code';

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
                onMoveItem={moveItem}
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
                      openCreateDialog(groupId);
                    }}
                    onEditItem={editItem}
                    sections={filteredSections}
                  />
                ) : (
                  <TestsList
                    error={activeError}
                    itemGroupIdMap={itemGroupIdMap}
                    items={listItems}
                    onEditItem={editItem}
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
        onClose={closeDialog}
        onDelete={deleteItem}
        onSave={saveItem}
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
