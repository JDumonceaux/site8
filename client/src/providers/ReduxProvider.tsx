import type { ReactNode, JSX } from 'react';

import { Provider } from 'react-redux';
import store from 'store/store';

type ReduxProviderProps = {
  /** React nodes to be wrapped by the Redux store provider */
  children: ReactNode;
};

/**
 * Wraps the application in a Redux store provider.
 */
const ReduxProvider = ({
  children,
}: ReduxProviderProps): JSX.Element | null => (
  <Provider store={store}>{children}</Provider>
);

ReduxProvider.displayName = 'ReduxProvider';
export default ReduxProvider;
