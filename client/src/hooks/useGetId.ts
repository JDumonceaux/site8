import { useId } from 'react';

const useGetId = (id: string | undefined) => {
  const tempId = useId();
  if (id) {
    return id;
  }
  return tempId;
};

export default useGetId;
