import './HomeLayout.css';

import ErrorBoundary from 'components/common/ErrorBoundary';
import { Footer } from 'components/common/Footer';
import { Header } from 'components/common/Header';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function HomeLayout() {
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
