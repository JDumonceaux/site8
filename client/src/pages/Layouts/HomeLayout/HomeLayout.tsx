import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header } from '../../../components/common';
import ErrorBoundary from '../../../components/common/ErrorBoundary';

export function HomeLayout(): JSX.Element {
  return (
    <ErrorBoundary fallback="Error">
      <div className="home-layout">
        <Header />
        <Suspense fallback="Loading ...">
          <Outlet />
        </Suspense>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
