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
    fetchMenuValues();
  }, [fetchMenuValues]);
};

export default useAppSetup;
