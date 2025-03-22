import { useEffect } from 'react';

import useMenu from './useMenu';

const useAppInitializer = () => {
  const { fetchData: fetchMenu } = useMenu();

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);
};

export default useAppInitializer;
