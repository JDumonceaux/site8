import { apiClient } from '@lib/api';
import {
  ENDPOINT_TEST_DELETE,
  ENDPOINT_TEST_UPDATE,
  ServiceUrl,
} from '@lib/utils/constants';
import type { Test } from '@site8/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UseTestMutationsOptions = {
  onCreateError?: (error: Error) => void;
  onCreateSuccess?: () => void;
  onDeleteError?: (error: Error) => void;
  onDeleteSuccess?: () => void;
  onMoveError?: (error: Error) => void;
  onMoveSuccess?: () => void;
  onUpdateError?: (error: Error) => void;
  onUpdateSuccess?: () => void;
};

type UseTestMutationsReturn = {
  createTest: (params: { groupId: number; item: Test }) => void;
  deleteTest: (itemId: number) => void;
  moveTest: (params: {
    currentGroupId: number;
    itemId: number;
    newGroupId: number;
  }) => void;
  updateTest: (params: { groupId: number; item: Test }) => void;
};

/**
 * Custom hook for test item mutations (update, delete, move).
 * Provides mutation functions with automatic cache invalidation.
 */
const useTestMutations = ({
  onCreateError,
  onCreateSuccess,
  onDeleteError,
  onDeleteSuccess,
  onMoveError,
  onMoveSuccess,
  onUpdateError,
  onUpdateSuccess,
}: UseTestMutationsOptions = {}): UseTestMutationsReturn => {
  const queryClient = useQueryClient();

  const { mutate: createTest } = useMutation({
    mutationFn: async ({ groupId, item }: { groupId: number; item: Test }) => {
      return apiClient.post(ServiceUrl.ENDPOINT_TESTS, {
        groupId,
        item: {
          code: item.code,
          comments: item.comments,
          name: item.name,
          tags: item.tags,
        },
      });
    },
    onError: (error: Error) => {
      if (onCreateError) {
        onCreateError(error);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tests'] });
      if (onCreateSuccess) {
        onCreateSuccess();
      }
    },
  });

  const { mutate: updateTest } = useMutation({
    mutationFn: async ({ groupId, item }: { groupId: number; item: Test }) => {
      return apiClient.put(ENDPOINT_TEST_UPDATE(item.id), {
        groupId,
        item: {
          comments: item.comments,
          name: item.name,
          tags: item.tags,
        },
      });
    },
    onError: (error: Error) => {
      if (onUpdateError) {
        onUpdateError(error);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tests'] });
      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    },
  });

  const { mutate: deleteTest } = useMutation({
    mutationFn: async (itemId: number) => {
      return apiClient.delete(ENDPOINT_TEST_DELETE(itemId));
    },
    onError: (error: Error) => {
      if (onDeleteError) {
        onDeleteError(error);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tests'] });
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    },
  });

  const { mutate: moveTest } = useMutation({
    mutationFn: async (params: {
      currentGroupId: number;
      itemId: number;
      newGroupId: number;
    }) => {
      if (params.newGroupId === params.currentGroupId) {
        return null;
      }

      return apiClient.put(ENDPOINT_TEST_UPDATE(params.itemId), {
        groupId: params.newGroupId,
        item: {},
      });
    },
    onError: (error: Error) => {
      if (onMoveError) {
        onMoveError(error);
      }
    },
    onSuccess: (data) => {
      if (data !== null) {
        void queryClient.invalidateQueries({ queryKey: ['tests'] });
        if (onMoveSuccess) {
          onMoveSuccess();
        }
      }
    },
  });

  return {
    createTest,
    deleteTest,
    moveTest,
    updateTest,
  };
};

export default useTestMutations;
