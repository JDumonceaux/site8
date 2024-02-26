import { ReactNode } from 'react';

import { Loading } from './Loading';

type IProps = {
  readonly children: ReactNode;
  readonly isLoading?: boolean;
  readonly error: string | undefined | null;
};

export const LoadingWrapper = ({
  children,
  isLoading,
  error,
}: IProps): JSX.Element => {
  if (isLoading) return <Loading />;

  if (error) return <div>{error}</div>;

  return <div className="loading-wrapper">{children}</div>;
};
