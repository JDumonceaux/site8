import { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = 1;

  const navigate = useNavigate();

  useEffect(() => {
    // Future implementation: Check if user is authenticated
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (user === null) {
      navigate('/login', { replace: true });
    }
  }, [navigate, user]);

  return <Outlet />;
};

export default ProtectedRoute;
