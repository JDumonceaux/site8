import useSnackbar from '@features/app/snackbar/useSnackbar';
import { ServiceUrl } from '@lib/utils/constants';
import { safeParse } from '@lib/utils/schemaHelper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { FormErrors, FormState, PageEdit } from '@types';
import { PageEditSchema } from '@types';

const usePagePatch = () => {
  const queryClient = useQueryClient();
  const { setMessage } = useSnackbar();

  // Send the data to the server
  const mutation = useMutation({
    mutationFn: async (data: PageEdit) => {
      const method = data.id && data.id > 0 ? 'PATCH' : 'POST';
      const response = await fetch(ServiceUrl.ENDPOINT_PAGE, {
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        method,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json() as Promise<PageEdit>;
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
      void queryClient.invalidateQueries({ queryKey: ['page'] });
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
  ): Promise<FormState<null>> => {
    const temp = Object.fromEntries(formData.entries());
    const data: PageEdit = { ...temp, id: Number(temp.id) } as PageEdit;

    const validationResult = safeParse<PageEdit>(PageEditSchema, data);

    if (!validationResult.success) {
      const tempErrors: FormErrors = {};

      // Map each Valibot issue into our FormErrors shape

      for (const issue of validationResult.error ?? []) {
        const firstPath = issue.path?.[0];
        if (
          !firstPath ||
          typeof firstPath !== 'object' ||
          !('key' in firstPath)
        )
          continue;
        const fieldName = firstPath.key as keyof FormErrors;
        tempErrors[fieldName] = { errors: [] };
        tempErrors[fieldName].errors?.push({
          message: issue.message,
        });
      }

      return {
        fieldData: data,
        fields: tempErrors,
        message: 'Validation error: Invalid data',
      } as unknown as FormState<null>;
    }

    try {
      await mutation.mutateAsync(data);
      return {
        fieldData: null,
        message: 'Data saved successfully!',
      } as FormState<null>;
    } catch (error) {
      return {
        fieldData: null,
        message: `Error saving data: ${(error as Error).message}`,
      } as FormState<null>;
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
