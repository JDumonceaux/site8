import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useSnackbar from 'features/app/useSnackbar';
import { ServiceUrl } from 'lib/utils/constants';
import { type Page, type PageEdit } from 'types';
import { z } from 'zod';

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

  const isValid = (data: PageEdit): boolean => {
    const schema = z.object({
      id: z.number(),
      name: z
        .string({
          invalid_type_error: 'Name must be a string',
          required_error: 'Name is required.',
        })
        .min(1, 'Name is required.')
        .max(500, 'Name max length exceeded: 500')
        .trim(),
      parent: z.string().min(1, 'Parent is required.'),
      readability_score: z.string().trim().optional(),
      reading_time: z.string().trim().optional(),
      text: z.string().trim(),
      to: z.string().trim().optional(),
      url: z.string().trim().optional(),
    });
    if (schema.safeParse(data)) {
      return true;
    }
    setMessage('Validation error: Invalid data');
    return false;
  };

  const patchItem = async (
    _prevState: unknown,
    formData: FormData,
  ): Promise<FormState> => {
    const temp = Object.fromEntries(formData.entries());
    const data: PageEdit = { ...temp, id: Number(temp.id) } as PageEdit;

    if (!isValid(data)) {
      return {
        fieldData: {},
        message: 'Validation error: Invalid data',
      } as FormState;
    }

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
