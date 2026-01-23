import { lazy, useMemo } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { QueryClient } from '@tanstack/react-query';
import { adminRoutes } from './routes/adminRoutes';
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
const createAppRouter = (queryClient: QueryClient) => {
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
        {/* ===== ADMIN ROUTES (Admin Role Required) ===== */}
        {adminRoutes(queryClient)}
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
  // Create QueryClient once and memoize it
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 10 * 60 * 1000, // 10 minutes
            staleTime: 5 * 60 * 1000, // 5 minutes
          },
        },
      }),
    [],
  );

  // Create router with the stable QueryClient
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};

AppRouter.displayName = 'AppRouter';
export default AppRouter;
