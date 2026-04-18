import type { JSX } from 'react';

import IconButton from '@common/button/icon-button/IconButton';
import { FilterIcon } from '@common/icons';
import StickyMenuWrapper from '@common/layout/StickyMenuWrapper';
import LoadingWrapper from '@common/loading/LoadingWrapper';
import Meta from '@common/meta/Meta';
import PageTitle from '@common/page/PageTitle';
import Layout from '@feature/layouts/layout/Layout';
import ImageEditDialog from './edit/dialog/ImageEditDialog';
import ImageFiltersDialog from './ImageFiltersDialog';
import Items from './Items';
import useImagesPageController from './useImagesPageController';
import styled from 'styled-components';

const ImagesPage = (): JSX.Element => {
  const {
    availableFolders,
    count,
    dragOverFolder,
    editingImage,
    error,
    folderFilter,
    foldersError,
    handleCardDragStart,
    handleCardSelect,
    handleCloseDialog,
    handleDeleteImage,
    handleFolderDragLeave,
    handleFolderDragOver,
    handleFolderDrop,
    handleOpenEdit,
    handleSaveImage,
    imageItems,
    isDeletePending,
    isDialogOpen,
    isError,
    isFiltersOpen,
    isFoldersError,
    isFoldersLoading,
    isLoading,
    isMovePending,
    isUpdatePending,
    matchedFilter,
    saveError,
    selectedCount,
    selectedImageIds,
    setFolderFilter,
    setIsFiltersOpen,
    setMatchedFilter,
  } = useImagesPageController();

  const title = 'Images';

  return (
    <>
      <Meta
        description="Browse image files and unmatched image entries."
        title={title}
      />
      <Layout.TwoColumn>
        <Layout.Menu>
          <StickyMenuWrapper>
            <MenuPanel aria-label="Image folders">
              <IconButton
                aria-label="Open filters"
                onClick={() => {
                  setIsFiltersOpen(true);
                }}
              >
                <FilterIcon />
              </IconButton>
              <Count>{count} items</Count>
              <Count>{selectedCount} selected</Count>
              <FolderSection>
                <FolderTitle>Folders (2025)</FolderTitle>
                <LoadingWrapper
                  error={foldersError}
                  isError={isFoldersError}
                  isLoading={isFoldersLoading}
                >
                  <FolderList>
                    {availableFolders.map((folder) => (
                      <FolderItem
                        $isDropTarget={dragOverFolder === folder}
                        key={folder}
                        onDragLeave={handleFolderDragLeave}
                        onDragOver={(event) => {
                          handleFolderDragOver(event, folder);
                        }}
                        onDrop={(event) => {
                          handleFolderDrop(event, folder);
                        }}
                      >
                        {folder}
                      </FolderItem>
                    ))}
                  </FolderList>
                </LoadingWrapper>
              </FolderSection>
            </MenuPanel>
          </StickyMenuWrapper>
        </Layout.Menu>
        <Layout.Content>
          <Layout.Article>
            <PageTitle title={title} />
            <Layout.Section>
              <LoadingWrapper
                error={error}
                isError={isError}
                isLoading={
                  isLoading ||
                  isMovePending ||
                  isDeletePending ||
                  isUpdatePending
                }
              >
                <Items
                  items={imageItems}
                  onCardDragStart={handleCardDragStart}
                  onCardEdit={handleOpenEdit}
                  onCardSelect={handleCardSelect}
                  selectedImageIds={selectedImageIds}
                />
              </LoadingWrapper>
            </Layout.Section>
          </Layout.Article>
        </Layout.Content>
      </Layout.TwoColumn>
      <ImageEditDialog
        availableFolders={availableFolders}
        image={editingImage}
        isDeleting={isDeletePending}
        isOpen={isDialogOpen}
        isSaving={isUpdatePending}
        key={editingImage?.src ?? ''}
        onClose={handleCloseDialog}
        onDelete={handleDeleteImage}
        onSave={handleSaveImage}
        saveError={saveError}
      />
      <ImageFiltersDialog
        availableFolders={availableFolders}
        folderFilter={folderFilter}
        isOpen={isFiltersOpen}
        matchedFilter={matchedFilter}
        onClose={() => {
          setIsFiltersOpen(false);
        }}
        setFolderFilter={setFolderFilter}
        setMatchedFilter={setMatchedFilter}
      />
    </>
  );
};

export default ImagesPage;

const MenuPanel = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Count = styled.div`
  color: var(--text-secondary-color);
  font-size: var(--font-size-sm);
`;

const FolderSection = styled.div`
  margin-top: 1rem;
`;

const FolderTitle = styled.div`
  color: var(--text-primary-color);
  font-size: var(--font-size-base);
  margin: 0 0 0.5rem;
`;

const FolderList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const FolderItem = styled.li<{ $isDropTarget: boolean }>`
  color: ${({ $isDropTarget }) =>
    $isDropTarget
      ? 'var(--text-primary-color)'
      : 'var(--text-secondary-color)'};
  font-size: var(--font-size-sm);
  padding: 0.375rem 0.5rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid
    ${({ $isDropTarget }) =>
      $isDropTarget ? 'var(--status-info)' : 'transparent'};
  background-color: ${({ $isDropTarget }) =>
    $isDropTarget ? 'var(--status-info-light)' : 'transparent'};
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: var(--text-primary-color);
    background-color: var(--surface-elevated-color);
    border-color: var(--border-light);
  }
`;
