import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

type ReduxProviderProps = {
  readonly children: ReactNode;
};

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
