import type { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Protects routes by redirecting unauthenticated users to login.
 */
const ProtectedRoute = (): JSX.Element | null => {
  // TODO: Replace this with real authentication logic (e.g., useAuth hook/context).
  const user = 1; // Dummy placeholder

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!user) {
    return (
      <Navigate
        replace
        to="/login"
      />
    );
  }

  return <Outlet />;
};

ProtectedRoute.displayName = 'ProtectedRoute';
export default ProtectedRoute;
