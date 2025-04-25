import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useSnackbar from 'features/app/useSnackbar';
import { ServiceUrl } from 'lib/utils/constants';
import type { Page, PageEdit } from 'types';

export type FormState = {
  fieldData: Page;
  message?: string;
};

const usePagePatch = () => {
  const queryClient = useQueryClient();
  const { setMessage } = useSnackbar();

  const mutation = useMutation({
    mutationFn: async (data: PageEdit) => {
      if (data.id && data.id > 0) {
        return axios.patch<PageEdit>(ServiceUrl.ENDPOINT_PAGE, data);
      } else {
        return axios.post<PageEdit>(ServiceUrl.ENDPOINT_PAGE, data);
      }
    },
    onSuccess: () => {
      setMessage('Saved');
      queryClient.invalidateQueries({ queryKey: ['page'] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else if (typeof error === 'string') {
        setMessage(error);
      } else {
        setMessage('Unknown error occurred');
      }
    },
  });

  const patchItem = async (
    _prevState: unknown,
    formData: FormData,
  ): Promise<FormState> => {
    const temp = Object.fromEntries(formData.entries());
    const data: PageEdit = { ...temp, id: Number(temp.id) } as PageEdit;

    try {
      await mutation.mutateAsync(data);
      return {
        fieldData: data as unknown as Page,
        message: 'Data saved successfully!',
      } as FormState;
    } catch (error) {
      return {
        fieldData: {},
        message: `Error saving data: ${(error as Error).message}`,
      } as FormState;
    }
  };

  return {
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    isPending: mutation.isPending,
    patchItem,
  };
};

export default usePagePatch;
