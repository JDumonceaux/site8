import { Provider } from 'react-redux';
import store from 'store/store';

type ReduxProviderProps = {
  children: React.ReactNode;
};

const ReduxProvider = ({ children }: ReduxProviderProps) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxProvider;
