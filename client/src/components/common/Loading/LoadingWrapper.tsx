import { ReactNode } from 'react';

import Loading from './Loading';

type IProps = {
  children: ReactNode;
  isLoading?: boolean;
  error: string | undefined | null;
};

export default function LoadingWrapper({ children, isLoading, error }: IProps) {
  if (isLoading) return <Loading />;

  if (error) return <div>{error}</div>;

  return <div className="loading-wrapper">{children}</div>;
}