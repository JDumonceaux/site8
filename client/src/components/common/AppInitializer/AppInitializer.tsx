import useAppSetup from 'hooks/useAppSetup';

/**
 * Component responsible for application setup to avoid unnecessary re-renders
 * by keeping setup logic outside of the main application component.
 */
const AppInitializer = () => {
  useAppSetup();
  return null;
};

export default AppInitializer;
