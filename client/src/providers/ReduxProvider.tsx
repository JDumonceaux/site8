import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

interface IProps {
  readonly children: ReactNode;
}

export const ReduxProvider = ({ children }: IProps) => {
  return <Provider store={store}>{children}</Provider>;
};
