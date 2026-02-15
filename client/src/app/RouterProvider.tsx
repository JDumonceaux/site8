import { lazy, useMemo } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { authRoutes } from './routes/authRoutes';
import { protectedContentRoutes } from './routes/protectedContentRoutes';
import { publicRoutes } from './routes/publicRoutes';

// ---------------------
// Error Pages
// ---------------------
const NotFound = lazy(async () => import('../features/site/NotFoundPage'));
const ErrorPage = lazy(async () => import('../features/site/ErrorPage'));

/**
 * Creates router configuration with proper route protection and organization
 */
const createAppRouter = () => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route
        errorElement={<ErrorPage />}
        path="/"
      >
        {/* ===== PUBLIC ROUTES (No Authentication Required) ===== */}
        {publicRoutes}
        {/* ===== AUTHENTICATION ROUTES (For Unauthenticated Users) ===== */}
        {authRoutes}
        {/* ===== PROTECTED ROUTES (Authentication Required) ===== */}
        {protectedContentRoutes}
        {/* ===== FALLBACK ROUTES ===== */}
        <Route
          element={<NotFound />}
          path="*"
        />
      </Route>,
    ),
    {
      future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionStatusRevalidation: true,
        v7_startTransition: true,
      },
    },
  );
};

/**
 * App Router component with proper QueryClient management
 */
const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};

AppRouter.displayName = 'AppRouter';
export default AppRouter;
