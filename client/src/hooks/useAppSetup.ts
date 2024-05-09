import { useEffect } from 'react';
import useMenu from './useMenu';
import useMenuValues from './useMenuValues';

const useAppSetup = () => {
  const { fetchData: fetchMenu } = useMenu();
  const { fetchData: fetchMenuValues } = useMenuValues();

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  useEffect(() => {
    console.log('useAppSetup2');
    fetchMenuValues();
  }, [fetchMenuValues]);
};

export default useAppSetup;
