import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function ProtectedRoute() {
  const user = 1;

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/login', { replace: true });
    }
  }, [navigate, user]);

  return <Outlet />;
}
