import { useEffect } from 'react';
import useMenu from './useMenu';
import useMenuAbbr from './useMenuAbbr';

const useAppSetup = () => {
  const { fetchData: fetchMenu } = useMenu();
  const { fetchData: fetchMenuAbbr } = useMenuAbbr();

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  useEffect(() => {
    fetchMenuAbbr();
  }, [fetchMenuAbbr]);
};

export default useAppSetup;
