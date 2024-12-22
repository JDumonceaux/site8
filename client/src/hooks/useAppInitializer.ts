import { useEffect } from 'react';

import useMenu from './useMenu';
import useImageFolder from '../features/imagesEdit/useImageFolder';

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
