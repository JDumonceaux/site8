import AppSetup from 'components/common/AppSetup/AppSetup';
import ErrorBoundary from 'components/common/ErrorBoundary';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const PhotoLayout = (): JSX.Element => (
  <ErrorBoundary fallback="Error">
    <AppSetup />
    <Suspense fallback="Loading ...">
      <Outlet />
    </Suspense>
  </ErrorBoundary>
);

export default PhotoLayout;
