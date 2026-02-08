import {
  ENDPOINT_TEST_DELETE,
  ENDPOINT_TEST_UPDATE,
} from '@lib/utils/constants';
import type { Test } from '@site8/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UseTestMutationsOptions = {
  onDeleteError?: (error: Error) => void;
  onDeleteSuccess?: () => void;
  onMoveError?: (error: Error) => void;
  onMoveSuccess?: () => void;
  onUpdateError?: (error: Error) => void;
  onUpdateSuccess?: () => void;
};

type UseTestMutationsReturn = {
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
  onDeleteError,
  onDeleteSuccess,
  onMoveError,
  onMoveSuccess,
  onUpdateError,
  onUpdateSuccess,
}: UseTestMutationsOptions = {}): UseTestMutationsReturn => {
  const queryClient = useQueryClient();

  const { mutate: updateTest } = useMutation({
    mutationFn: async ({ groupId, item }: { groupId: number; item: Test }) => {
      const response = await fetch(ENDPOINT_TEST_UPDATE(item.id), {
        body: JSON.stringify({
          groupId,
          item: {
            comments: item.comments,
            name: item.name,
            tags: item.tags,
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

      return response.json() as Promise<unknown>;
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
      const response = await fetch(ENDPOINT_TEST_DELETE(itemId), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      return response.json() as Promise<unknown>;
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

      const response = await fetch(ENDPOINT_TEST_UPDATE(params.itemId), {
        body: JSON.stringify({
          groupId: params.newGroupId,
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

      return response.json() as Promise<unknown>;
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
    deleteTest,
    moveTest,
    updateTest,
  };
};

export default useTestMutations;
