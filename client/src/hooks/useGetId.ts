import { useId } from 'react';

const useGetId = (id?: string): string => {
  const generatedId = useId();
  return id ?? generatedId;
};

export default useGetId;
