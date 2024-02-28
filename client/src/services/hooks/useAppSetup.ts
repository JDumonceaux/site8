import { useEffect } from 'react';

import useMenu from './useMenu';

const useAppSetup = () => {
  const { fetchData: fetchMenu } = useMenu();

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);
};

export default useAppSetup;
