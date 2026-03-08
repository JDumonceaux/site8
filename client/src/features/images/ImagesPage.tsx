import type { DragEvent, JSX } from 'react';
import { useState } from 'react';

import useSnackbar from '@app/snackbar/useSnackbar';
import IconButton from '@components/button/icon-button/IconButton';
import { FilterIcon } from '@components/icons';
import StickyMenuWrapper from '@components/layout/StickyMenuWrapper';
import LoadingWrapper from '@components/loading/LoadingWrapper';
import Meta from '@components/meta/Meta';
import PageTitle from '@components/page/PageTitle';
import Layout from '@features/layouts/layout/Layout';
import { logError } from '@lib/utils/errorHandler';
import type { ImageFile } from '@site8/shared';
import type { ImageItem } from '@types';
import ImageEditDialog from './edit/dialog/ImageEditDialog';
import ImageFiltersDialog from './ImageFiltersDialog';
import Items from './Items';
import useDeleteImage from './useDeleteImage';
import useImageFolders from './useImageFolders';
import useImages, { type MatchedFilter } from './useImages';
import useMoveImages from './useMoveImages';
import useUpdateImage from './useUpdateImage';
import styled from 'styled-components';

const toImageItem = (item: ImageFile, index: number): ImageItem => ({
  currentFolder: item.folder,
  ...(item.description ? { description: item.description } : {}),
  isMatched: (item.id ?? 0) > 0,
  seq: item.seq ?? index,
  src: item.src ?? '',
  title: item.title ?? item.fileName,
});

const EMPTY_FOLDERS: readonly string[] = [];

const ImagesPage = (): JSX.Element => {
  const [matchedFilter, setMatchedFilter] = useState<MatchedFilter>('all');
  const [folderFilter, setFolderFilter] = useState<string>('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saveError, setSaveError] = useState<string>('');
  const [selectedImageIds, setSelectedImageIds] = useState<Set<number>>(
    new Set(),
  );
  const [dragOverFolder, setDragOverFolder] = useState<null | string>(null);
  const { setErrorMessage, setMessage } = useSnackbar();
  const { data, error, isError, isLoading } = useImages({
    folder: folderFilter,
    matchedFilter,
  });
  const {
    data: foldersData,
    error: foldersError,
    isError: isFoldersError,
    isLoading: isFoldersLoading,
  } = useImageFolders();

  const { isPending: isMovePending, moveImages } = useMoveImages(
    (movedCount) => {
      setMessage(`Moved ${movedCount} image${movedCount === 1 ? '' : 's'}`);
      setSelectedImageIds(new Set());
    },
    (moveError) => {
      setErrorMessage(moveError.message);
    },
  );
  const { deleteImage, isPending: isDeletePending } = useDeleteImage(
    (response) => {
      setMessage(
        response.deletedFile
          ? 'Image deleted'
          : 'Image entry removed from images index',
      );
      setSelectedImageIds(new Set());
    },
    (deleteError) => {
      setErrorMessage(deleteError.message);
    },
  );
  const handleCloseDialog = (): void => {
    setIsDialogOpen(false);
    setEditingImage(null);
    setSaveError('');
  };

  const { isPending: isUpdatePending, updateImage } = useUpdateImage(
    () => {
      setMessage('Image updated');
      setSaveError('');
      setSelectedImageIds(new Set());
      handleCloseDialog();
    },
    (renameError) => {
      setSaveError(renameError.message);
    },
  );

  if (isError && error != null) {
    logError(error, {
      action: 'loadImages',
      componentName: 'ImagesPage',
    });
  }

  const title = 'Images';
  const imageItems: readonly ImageItem[] = (data?.items ?? []).map(toImageItem);
  const count = imageItems.length;
  const selectedCount = selectedImageIds.size;
  const availableFolders = foldersData?.items ?? EMPTY_FOLDERS;

  const selectedImageSrcs = imageItems
    .filter((item) => selectedImageIds.has(item.seq))
    .map((item) => item.src);

  const handleCardSelect = (imageId: number): void => {
    setSelectedImageIds((current) => {
      const next = new Set(current);

      if (next.has(imageId)) {
        next.delete(imageId);
      } else {
        next.add(imageId);
      }

      return next;
    });
  };

  const handleCardDragStart = (imageId: number): void => {
    setSelectedImageIds((current) => {
      if (current.has(imageId)) {
        return current;
      }

      return new Set([imageId]);
    });
  };

  const handleFolderDragOver = (
    event: DragEvent<HTMLLIElement>,
    folder: string,
  ): void => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setDragOverFolder(folder);
  };

  const handleFolderDrop = (
    event: DragEvent<HTMLLIElement>,
    folder: string,
  ): void => {
    event.preventDefault();
    setDragOverFolder(null);

    if (selectedImageSrcs.length === 0 || isMovePending) {
      return;
    }

    moveImages({
      imageSrcs: selectedImageSrcs,
      targetFolder: folder,
    });
  };

  const handleOpenEdit = (image: ImageItem): void => {
    setEditingImage(image);
    setIsDialogOpen(true);
  };

  const handleSaveImage = (
    image: ImageItem,
    targetFolder: string,
    targetFileName: string,
    description: string,
    imageTitle: string,
  ): void => {
    updateImage({
      description,
      src: image.src,
      targetFileName,
      targetFolder,
      title: imageTitle,
    });
  };

  const handleDeleteImage = (image: ImageItem): void => {
    deleteImage({ src: image.src });
    handleCloseDialog();
  };

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
                        onDragLeave={() => {
                          setDragOverFolder(null);
                        }}
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
