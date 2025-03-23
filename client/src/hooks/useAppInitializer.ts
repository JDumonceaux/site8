import { useEffect } from 'react';

import useMenu from 'features/app/useMenu';

const useAppInitializer = () => {
  const { fetchData: fetchMenu } = useMenu();

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);
};

export default useAppInitializer;
