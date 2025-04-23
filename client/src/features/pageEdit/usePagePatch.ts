import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ServiceUrl } from 'lib/utils/constants';
import type { Page, PageEdit } from 'types';

export type FormState = {
  fieldData: Page;
  message?: string;
};

const usePagePatch = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: PageEdit) =>
      axios.patch<PageEdit>(ServiceUrl.ENDPOINT_PAGE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page'] });
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
    isUpdating: mutation.isPending,
    patchItem,
  };
};

export default usePagePatch;
