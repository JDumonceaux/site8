import { type DragEvent, useCallback, useState } from 'react';

import useSnackbar from '@app/snackbar/useSnackbar';
import { logError } from '@lib/utils/errorHandler';
import type { ImageFile } from '@site8/shared';
import type { ImageItem } from '@types';
import useDeleteImage from './useDeleteImage';
import useImageFolders from './useImageFolders';
import useImages, { type MatchedFilter } from './useImages';
import useMoveImages from './useMoveImages';
import useUpdateImage from './useUpdateImage';

const toImageItem = (item: ImageFile, index: number): ImageItem => ({
  currentFolder: item.folder,
  ...(item.description ? { description: item.description } : {}),
  isMatched: (item.id ?? 0) > 0,
  seq: item.seq ?? index,
  src: item.src ?? '',
  title: item.title ?? item.fileName,
});

const EMPTY_FOLDERS: readonly string[] = [];

export type UseImagesPageControllerResult = {
  readonly availableFolders: readonly string[];
  readonly count: number;
  readonly dragOverFolder: null | string;
  readonly editingImage: ImageItem | null;
  readonly error: unknown;
  readonly folderFilter: string;
  readonly foldersError: unknown;
  readonly handleCardDragStart: (imageId: number) => void;
  readonly handleCardSelect: (imageId: number) => void;
  readonly handleCloseDialog: () => void;
  readonly handleDeleteImage: (image: ImageItem) => void;
  readonly handleFolderDragLeave: () => void;
  readonly handleFolderDragOver: (
    event: DragEvent<HTMLLIElement>,
    folder: string,
  ) => void;
  readonly handleFolderDrop: (
    event: DragEvent<HTMLLIElement>,
    folder: string,
  ) => void;
  readonly handleOpenEdit: (image: ImageItem) => void;
  readonly handleSaveImage: (
    image: ImageItem,
    targetFolder: string,
    targetFileName: string,
    description: string,
    imageTitle: string,
  ) => void;
  readonly imageItems: readonly ImageItem[];
  readonly isDeletePending: boolean;
  readonly isDialogOpen: boolean;
  readonly isError: boolean;
  readonly isFiltersOpen: boolean;
  readonly isFoldersError: boolean;
  readonly isFoldersLoading: boolean;
  readonly isLoading: boolean;
  readonly isMovePending: boolean;
  readonly isUpdatePending: boolean;
  readonly matchedFilter: MatchedFilter;
  readonly saveError: string;
  readonly selectedCount: number;
  readonly selectedImageIds: Set<number>;
  readonly setFolderFilter: (value: string) => void;
  readonly setIsFiltersOpen: (value: boolean) => void;
  readonly setMatchedFilter: (value: MatchedFilter) => void;
};

const useImagesPageController = (): UseImagesPageControllerResult => {
  const [matchedFilter, setMatchedFilter] = useState<MatchedFilter>('all');
  const [folderFilter, setFolderFilter] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [selectedImageIds, setSelectedImageIds] = useState(new Set<number>());
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

  const handleCloseDialog = useCallback((): void => {
    setIsDialogOpen(false);
    setEditingImage(null);
    setSaveError('');
  }, []);

  const { isPending: isMovePending, moveImages } = useMoveImages(
    (movedCount) => {
      setMessage(`Moved ${movedCount} image${movedCount === 1 ? '' : 's'}`);
      setSelectedImageIds(new Set<number>());
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
      setSelectedImageIds(new Set<number>());
    },
    (deleteError) => {
      setErrorMessage(deleteError.message);
    },
  );

  const { isPending: isUpdatePending, updateImage } = useUpdateImage(
    () => {
      setMessage('Image updated');
      setSaveError('');
      setSelectedImageIds(new Set<number>());
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

  const imageItems: readonly ImageItem[] = (data?.items ?? []).map(toImageItem);
  const count = imageItems.length;
  const selectedCount = selectedImageIds.size;
  const availableFolders = foldersData?.items ?? EMPTY_FOLDERS;

  const selectedImageSrcs = imageItems
    .filter((item) => selectedImageIds.has(item.seq))
    .map((item) => item.src);

  const handleCardSelect = useCallback((imageId: number): void => {
    setSelectedImageIds((current) => {
      const next = new Set(current);
      if (next.has(imageId)) {
        next.delete(imageId);
      } else {
        next.add(imageId);
      }
      return next;
    });
  }, []);

  const handleCardDragStart = useCallback((imageId: number): void => {
    setSelectedImageIds((current) => {
      if (current.has(imageId)) return current;
      return new Set([imageId]);
    });
  }, []);

  const handleFolderDragLeave = useCallback((): void => {
    setDragOverFolder(null);
  }, []);

  const handleFolderDragOver = useCallback(
    (event: DragEvent<HTMLLIElement>, folder: string): void => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      setDragOverFolder(folder);
    },
    [],
  );

  const handleFolderDrop = useCallback(
    (event: DragEvent<HTMLLIElement>, folder: string): void => {
      event.preventDefault();
      setDragOverFolder(null);

      if (selectedImageSrcs.length === 0 || isMovePending) return;

      moveImages({
        imageSrcs: selectedImageSrcs,
        targetFolder: folder,
      });
    },
    [isMovePending, moveImages, selectedImageSrcs],
  );

  const handleOpenEdit = useCallback((image: ImageItem): void => {
    setEditingImage(image);
    setIsDialogOpen(true);
  }, []);

  const handleSaveImage = useCallback(
    (
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
    },
    [updateImage],
  );

  const handleDeleteImage = useCallback(
    (image: ImageItem): void => {
      deleteImage({ src: image.src });
      handleCloseDialog();
    },
    [deleteImage, handleCloseDialog],
  );

  return {
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
  };
};

export default useImagesPageController;
