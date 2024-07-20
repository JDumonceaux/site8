import AppSetup from 'components/common/AppSetup/AppSetup';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

const HomeLayout = (): JSX.Element => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <AppSetup />
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  </ErrorBoundary>
);

export default HomeLayout;
