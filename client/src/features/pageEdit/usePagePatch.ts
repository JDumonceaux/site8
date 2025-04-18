import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ServiceUrl } from 'lib/utils/constants';
import { PageEdit } from 'types';

const usePagePatch = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PageEdit) =>
      axios.patch<PageEdit>(`${ServiceUrl.ENDPOINT_PAGE}`, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page'] });
    },
  });

  async function submitAction(prevState: any, formData: FormData) {
    // Object.fromEntries(formData.entries()) as PageEdit;
    const data: PageEdit = {
      id: Number(formData.get('id')),
      name: formData.get('name') as string,
      text: formData.get('text') as string,
      parent: formData.get('parent') as string,
    };

    console.log('Form data:', data);

    try {
      await mutation.mutateAsync(data);
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  return {
    submitAction,
    error: mutation.error,
    isError: mutation.isError,
    isUpdating: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};

export default usePagePatch;
