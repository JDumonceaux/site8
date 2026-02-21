import type { DragEvent, JSX } from 'react';
import { useState } from 'react';

import useSnackbar from '@app/snackbar/useSnackbar';
import StickyMenuWrapper from '@components/layout/StickyMenuWrapper';
import LoadingWrapper from '@components/loading/LoadingWrapper';
import Meta from '@components/meta/Meta';
import PageTitle from '@components/page/PageTitle';
import Switch from '@components/switch/Switch';
import Layout from '@features/layouts/layout/Layout';
import { logError } from '@lib/utils/errorHandler';
import type { Image } from '@site8/shared';
import ImageEditDialog from './edit/dialog/ImageEditDialog';
import Items from './Items';
import useDeleteImage from './useDeleteImage';
import useImageFolders from './useImageFolders';
import useImages from './useImages';
import useMoveImages from './useMoveImages';
import useRenameImage from './useRenameImage';
import styled from 'styled-components';

const EMPTY_FOLDERS: readonly string[] = [];

const ImagesPage = (): JSX.Element => {
  const [unmatchedOnly, setUnmatchedOnly] = useState(false);
  const [editingImage, setEditingImage] = useState<Image | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImageIds, setSelectedImageIds] = useState<Set<number>>(
    new Set(),
  );
  const [dragOverFolder, setDragOverFolder] = useState<null | string>(null);
  const { setErrorMessage, setMessage } = useSnackbar();
  const { data, error, isError, isLoading } = useImages({ unmatchedOnly });
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
  const { isPending: isRenamePending, renameImage } = useRenameImage(
    () => {
      setMessage('Image updated');
      setSelectedImageIds(new Set());
    },
    (renameError) => {
      setErrorMessage(renameError.message);
    },
  );

  if (isError && error != null) {
    logError(error, {
      action: 'loadImages',
      componentName: 'ImagesPage',
    });
  }

  const title = unmatchedOnly ? 'Unmatched Images' : 'Images';
  const count = data?.items?.length ?? 0;
  const selectedCount = selectedImageIds.size;
  const availableFolders = foldersData?.items ?? EMPTY_FOLDERS;

  const selectedImageSrcs = (data?.items ?? [])
    .filter((item) => selectedImageIds.has(item.id))
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

  const handleOpenEdit = (image: Image): void => {
    setEditingImage(image);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (): void => {
    setIsDialogOpen(false);
    setEditingImage(null);
  };

  const handleSaveImage = (
    image: Image,
    targetFolder: string,
    targetFileName: string,
    description: string,
  ): void => {
    renameImage({
      description,
      src: image.src,
      targetFileName,
      targetFolder,
    });
    handleCloseDialog();
  };

  const handleDeleteImage = (image: Image): void => {
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
            <MenuPanel>
              <Switch
                checked={unmatchedOnly}
                id="unmatchedOnly"
                label="Show unmatched only"
                onCheckedChange={setUnmatchedOnly}
              />
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
                  isRenamePending
                }
              >
                <Items
                  items={data?.items}
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
        isSaving={isRenamePending}
        onClose={handleCloseDialog}
        onDelete={handleDeleteImage}
        onSave={handleSaveImage}
      />
    </>
  );
};

export default ImagesPage;

const MenuPanel = styled.div`
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

const FolderTitle = styled.h3`
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
