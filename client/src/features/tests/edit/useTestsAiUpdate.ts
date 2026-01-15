import useSnackbar from '@features/app/snackbar/useSnackbar';
import { ServiceUrl } from '@lib/utils/constants';
import type { Tests } from '@site8/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Custom hook for updating AI test data
 * Provides mutation functionality to update tests via API
 */
const useTestsAiUpdate = () => {
  const queryClient = useQueryClient();
  const { setErrorMessage, setMessage } = useSnackbar();

  const mutation = useMutation({
    mutationFn: async (data: Tests): Promise<boolean> => {
      const response = await fetch(ServiceUrl.ENDPOINT_TESTS_AI, {
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        const errorMsg =
          errorData.error ?? `HTTP error! status: ${response.status}`;
        throw new Error(errorMsg);
      }

      return response.json() as Promise<boolean>;
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        setErrorMessage(`Failed to save changes: ${error.message}`);
      } else if (typeof error === 'string') {
        setErrorMessage(`Failed to save changes: ${error}`);
      } else {
        setErrorMessage('Failed to save changes: Unknown error occurred');
      }
    },
    onSuccess: () => {
      setMessage('Changes saved successfully');
      // Invalidate the tests query to refetch fresh data
      void queryClient.invalidateQueries({ queryKey: ['tests', 'ai'] });
    },
  });

  return {
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
  };
};

export default useTestsAiUpdate;
