import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { previousDay } from 'date-fns';
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

  const bakeBun = async (prevState: number, formData: any) => {
    console.log('Form data:', formData);
    // Object.fromEntries(formData.entries()) as PageEdit;
    const data: PageEdit = {
      id: Number(formData.get('id')),
      name: formData.get('name') as string,
      text: formData.get('text') as string,
      parent: formData.get('parent') as string,
    };

    try {
      await mutation.mutateAsync(data);
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }

    return Number(formData.get('bunCount'));
  };

  return {
    bakeBun,
    error: mutation.error,
    isError: mutation.isError,
    isUpdating: mutation.isPending,
    isSuccess: mutation.isSuccess,
  };
};

export default usePagePatch;
