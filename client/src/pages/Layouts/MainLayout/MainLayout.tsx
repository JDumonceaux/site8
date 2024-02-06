import './MainLayout.css';

import ErrorBoundary from 'components/common/ErrorBoundary';
import { Footer } from 'components/common/Footer';
import { Header } from 'components/common/Header';
import MainMenu from 'components/common/MainMenu/MainMenu';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <ErrorBoundary fallback="Error">
      <div className="main-layout">
        <Header />
        <Suspense fallback="Loading ...">
          <Outlet />
        </Suspense>
        <MainMenu />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
