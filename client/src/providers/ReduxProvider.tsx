import { Provider } from 'react-redux';
import Store from 'store/Store';

type ReduxProviderProps = {
  readonly children: React.ReactNode;
};

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default ReduxProvider;
