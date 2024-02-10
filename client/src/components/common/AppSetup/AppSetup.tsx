import useAppSetup from 'services/hooks/useAppSetup';

// important that this is kept out of the <App/> or any other higher parent component,
// as anything that happens within there is triggered as a state change of the application
// and causes a total re-render
const AppSetup = () => {
  useAppSetup();
  return null;
};

export default AppSetup;
