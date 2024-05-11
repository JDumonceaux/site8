import { useEffect } from 'react';
import useMenu from './useMenu';
import useMenuValues from './useMenuValues';

const useAppSetup = () => {
  const { fetchData: fetchMenu } = useMenu();
  const { fetchData: fetchMenuValues } = useMenuValues();

  useEffect(() => {
    console.log('fetchMenu');
    fetchMenu();
  }, [fetchMenu]);

  useEffect(() => {
    console.log('fetchMenuValues');
    fetchMenuValues();
  }, [fetchMenuValues]);
};

export default useAppSetup;
