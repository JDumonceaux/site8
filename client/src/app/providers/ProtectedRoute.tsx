import type { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '@features/auth/useAuth';
import { env } from '@lib/env';

/**
 * Protects routes by redirecting unauthenticated users to the sign-in page.
 */
const ProtectedRoute = (): JSX.Element => {
  const { authorized } = useAuth();

  if (env.USE_AUTH && !authorized) {
    return (
      <Navigate
        replace
        to="/signin"
      />
    );
  }

  return <Outlet />;
};

ProtectedRoute.displayName = 'ProtectedRoute';
export default ProtectedRoute;
