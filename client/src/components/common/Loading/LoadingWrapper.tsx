import { ReactNode } from 'react';

import { Loading } from './Loading';

type IProps = {
  children: ReactNode;
  isLoading?: boolean;
  error: string | undefined | null;
};

export function LoadingWrapper({ children, isLoading, error }: IProps): JSX.Element {
  if (isLoading) return <Loading />;

  if (error) return <div>{error}</div>;

  return <div className="loading-wrapper">{children}</div>;
}
