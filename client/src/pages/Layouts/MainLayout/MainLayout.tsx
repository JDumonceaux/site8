import { Footer } from '../../../components/common/footer/Footer';
import { Header } from '../../../components/common/header/Header';
import ErrorBoundary from '../../../components/common/ErrorBoundary';
import './MainLayout.css';
import { Outlet } from 'react-router-dom';
import MainMenu from '../../../components/common/MainMenu/MainMenu';
import { Suspense } from 'react';

export default function MainLayout() {
  return (
    <ErrorBoundary fallback='Error'>
      <div className='main-layout'>
        <Header />
        <Suspense>
          <Outlet />
        </Suspense>
        <MainMenu />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
