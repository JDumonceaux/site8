import { useEffect } from 'react';

import useMenu from 'features/app/useMenu';

/**
 * Initializes application data by fetching menu data on mount.
 */
const useAppInitializer = () => {
  const { fetchData: fetchMenu } = useMenu();

  useEffect(() => {
    // Fetch menu data and log any errors.
    const initializeApp = async () => {
      try {
        await fetchMenu();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error initializing app (fetching menu):', error);
      }
    };

    initializeApp();
  }, [fetchMenu]);
};

export default useAppInitializer;
