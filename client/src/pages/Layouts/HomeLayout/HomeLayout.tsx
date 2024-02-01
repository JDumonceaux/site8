import ErrorBoundary from '../../../components/common/ErrorBoundary';
import './HomeLayout.css';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Footer } from '../../../components/common/Footer';
import { Header } from '../../../components/common/Header';

export default function HomeLayout() {
  return (
    <ErrorBoundary fallback='Error'>
      <div className='home-layout'>
        <Header />
        <Suspense fallback='Loading ...'>
          <Outlet />
        </Suspense>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
