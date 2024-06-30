import { useEffect } from 'react';
import useImageFolder from './useImageFolder';
import useMenu from './useMenu';
import useMenuAbbr from './useMenuAbbr';

const useAppSetup = () => {
  const { fetchData: fetchMenu } = useMenu();
  const { fetchData: fetchMenuAbbr } = useMenuAbbr();
  const { fetchData: fetchFolders } = useImageFolder();

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  useEffect(() => {
    fetchMenuAbbr();
  }, [fetchMenuAbbr]);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);
};

export default useAppSetup;
