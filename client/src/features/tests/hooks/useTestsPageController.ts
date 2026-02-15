import { useCallback, useEffect, useMemo, useState } from 'react';

import useSnackbar from '@app/snackbar/useSnackbar';
import type { Test, TestSection, TestsSection } from '@site8/shared';
import { useTestFilters } from './useTestFilters';
import useTestMutations from '../useTestMutations';
import useTests from '../useTests';
import useTestsList from '../useTestsList';
import useTestsSections from '../useTestsSections';

type UseTestsPageControllerResult = {
  readonly allSections: readonly TestsSection[];
  readonly allTags: readonly string[];
  readonly itemGroupIdMap: ReadonlyMap<number, number>;
  readonly listItems: readonly Test[];
  readonly activeError: Error | null;
  readonly activeIsError: boolean;
  readonly activeIsLoading: boolean;
  readonly editingItem: null | Test;
  readonly editingGroupId: null | number;
  readonly filteredSections: readonly TestSection[];
  readonly isDialogOpen: boolean;
  readonly isGrouped: boolean;
  readonly isSectionsLoading: boolean;
  readonly isSettingsOpen: boolean;
  readonly sectionFilter: string;
  readonly sectionNames: readonly string[];
  readonly tagFilter: string;
  readonly closeDialog: () => void;
  readonly deleteItem: (itemId: number) => void;
  readonly editItem: (item: Test, groupId: number) => void;
  readonly moveItem: (
    itemId: number,
    newGroupId: number,
    currentGroupId: number,
  ) => void;
  readonly openCreateDialog: (groupId: number) => void;
  readonly saveItem: (updatedItem: Test, groupId: number) => void;
  readonly setIsGrouped: (value: boolean) => void;
  readonly setIsSettingsOpen: (value: boolean) => void;
  readonly setSectionFilter: (value: string) => void;
  readonly setTagFilter: (value: string) => void;
};

const normalizeError = (error: unknown): Error | null => {
  if (error instanceof Error) {
    return error;
  }
  return null;
};

const useTestsPageController = (): UseTestsPageControllerResult => {
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
    return stored !== 'false';
  });

  const { setErrorMessage, setMessage } = useSnackbar();

  useEffect(() => {
    localStorage.setItem('testsViewGrouped', String(isGrouped));
  }, [isGrouped]);

  const sections = useMemo(
    () => groupedData?.sections ?? [],
    [groupedData?.sections],
  );

  const allSections = useMemo<TestsSection[]>(
    () => sectionsData?.items ?? [],
    [sectionsData?.items],
  );

  const listItems = useMemo<readonly Test[]>(
    () => listData?.items ?? [],
    [listData?.items],
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

  const activeError = normalizeError(isGrouped ? groupedError : listError);
  const activeIsError = isGrouped ? isGroupedError : isListError;
  const activeIsLoading = isGrouped ? isGroupedLoading : isListLoading;

  const closeDialog = useCallback(() => {
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
      closeDialog();
    },
    onDeleteError: (error: Error) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setMessage(`Failed to delete item: ${errorMessage}`);
    },
    onDeleteSuccess: () => {
      setMessage('Item deleted successfully');
      closeDialog();
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
      closeDialog();
    },
  });

  const editItem = useCallback((item: Test, groupId: number) => {
    setEditingItem(item);
    setEditingGroupId(groupId);
    setIsDialogOpen(true);
  }, []);

  const openCreateDialog = useCallback((groupId: number) => {
    setEditingItem(null);
    setEditingGroupId(groupId);
    setIsDialogOpen(true);
  }, []);

  const saveItem = useCallback(
    (updatedItem: Test, groupId: number) => {
      if (updatedItem.id === 0) {
        createTest({ groupId, item: updatedItem });
        return;
      }

      updateTest({ groupId, item: updatedItem });
    },
    [createTest, updateTest],
  );

  const deleteItem = useCallback(
    (itemId: number) => {
      deleteTest(itemId);
    },
    [deleteTest],
  );

  const moveItem = useCallback(
    (itemId: number, newGroupId: number, currentGroupId: number) => {
      moveTest({ currentGroupId, itemId, newGroupId });
    },
    [moveTest],
  );

  return {
    allSections,
    allTags,
    itemGroupIdMap,
    listItems,
    activeError,
    activeIsError,
    activeIsLoading,
    editingItem,
    editingGroupId,
    filteredSections,
    isDialogOpen,
    isGrouped,
    isSectionsLoading,
    isSettingsOpen,
    sectionFilter,
    sectionNames,
    tagFilter,
    closeDialog,
    deleteItem,
    editItem,
    moveItem,
    openCreateDialog,
    saveItem,
    setIsGrouped,
    setIsSettingsOpen,
    setSectionFilter,
    setTagFilter,
  };
};

export default useTestsPageController;
