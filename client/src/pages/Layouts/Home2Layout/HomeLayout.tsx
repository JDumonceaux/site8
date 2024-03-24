import Footer from 'components/common/Footer';
import Header from 'components/common/Header';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

export const Home2Layout = (): JSX.Element => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <div>
      <Header />
      <Suspense fallback="Loading ...">
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  </ErrorBoundary>
);
