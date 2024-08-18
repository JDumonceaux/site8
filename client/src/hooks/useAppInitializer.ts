import { useEffect } from 'react';

import useImageFolder from './useImageFolder';
import useMenu from './useMenu';

const useAppInitializer = () => {
  const { fetchData: fetchMenu } = useMenu();

  const { fetchData: fetchFolders } = useImageFolder();

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);
};

export default useAppInitializer;
