import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useSnackbar from 'features/app/Snackbar/useSnackbar';
import { ServiceUrl } from 'lib/utils/constants';
import type { FormErrors, FormState, Page } from 'types';
import { type PageEdit, PageEditSchema } from 'types/PageEditSchema';

const usePagePatch = () => {
  const queryClient = useQueryClient();
  const { setMessage } = useSnackbar();

  // Send the data to the server
  const mutation = useMutation({
    mutationFn: async (data: PageEdit) => {
      if (data.id && data.id > 0) {
        return axios.patch<PageEdit>(ServiceUrl.ENDPOINT_PAGE, data);
      }
      return axios.post<PageEdit>(ServiceUrl.ENDPOINT_PAGE, data);
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
    onSuccess: () => {
      setMessage('Saved');
      queryClient.invalidateQueries({ queryKey: ['page'] });
    },
  });

  // Validate the data using Zod schema
  // const isValid = (data: PageEdit): boolean => {
  //   const result = PageSchema.safeParse(data);
  //   if (result.success) {
  //     return true;
  //   }
  //   setMessage(`Validation error: ${result.error.message}`);
  //   return false;
  // };

  // Function to handle the form submission
  const patchItem = async (
    _prevState: unknown,
    formData: FormData,
  ): Promise<FormState> => {
    const temp = Object.fromEntries(formData.entries());
    const data: PageEdit = { ...temp, id: Number(temp.id) } as PageEdit;

    const validationResult = PageEditSchema.safeParse(data);

    if (!validationResult.success) {
      const tempErrors: FormErrors = {};

      // Map each Zod issue into our FormErrors shape
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as keyof FormErrors;
        tempErrors[fieldName] = { errors: [] };
        tempErrors[fieldName].errors?.push({
          message: issue.message,
        });
      }

      return {
        fieldData: data,
        fields: tempErrors,
        message: 'Validation error: Invalid data',
      } as unknown as FormState;
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
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    patchItem,
  };
};

export default usePagePatch;
