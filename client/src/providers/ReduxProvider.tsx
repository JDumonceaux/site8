import { useMemo } from 'react';

import { Provider } from 'react-redux';
import Store from 'store/store';

type ReduxProviderProps = {
  readonly children: React.ReactNode;
};

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return useMemo(
    () => <Provider store={Store}>{children}</Provider>,
    [children],
  );
};

export default ReduxProvider;
