import { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  // eslint-disable-next-line no-warning-comments
  // TODO: Replace this with your real authentication logic.
  const user = 1; // Dummy user; use your auth hook/context here.

  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not authenticated, redirect to the login page.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [navigate, user]);

  return <Outlet />;
};

export default ProtectedRoute;
