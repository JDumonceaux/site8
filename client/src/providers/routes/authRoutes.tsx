import { lazy } from 'react';
import { Route } from 'react-router-dom';

// ---------------------
// Layout
// ---------------------
const AuthLayout = lazy(
  async () => import('../../features/layouts/auth-layout/AuthLayout'),
);

// ---------------------
// Auth Pages
// ---------------------
const SigninPage = lazy(async () => import('../../features/auth/SigninPage'));
const SignoutPage = lazy(async () => import('../../features/auth/SignoutPage'));
const SignupPage = lazy(async () => import('../../features/auth/SignupPage'));
const ConfirmEmailPage = lazy(
  async () => import('../../features/auth/ConfirmEmailPage'),
);
const ForgotPasswordPage = lazy(
  async () => import('../../features/auth/ForgotPasswordPage'),
);
const ChangePasswordPage = lazy(
  async () => import('../../features/auth/ChangePasswordPage'),
);
const DeleteAccountPage = lazy(
  async () => import('../../features/auth/DeleteAccountPage'),
);

/**
 * Authentication routes for unauthenticated users
 * Includes signin, signup, password management, and account deletion
 */
export const authRoutes = (
  <Route element={<AuthLayout />}>
    <Route
      element={<SigninPage />}
      path="signin"
    />
    <Route
      element={<SignupPage />}
      path="signup"
    />
    <Route
      element={<SignoutPage />}
      path="signout"
    />
    <Route
      element={<ConfirmEmailPage />}
      path="confirm"
    />

    {/* Password Management */}
    <Route path="password">
      <Route
        element={<ForgotPasswordPage />}
        path="forgot"
      />
      <Route
        element={<ChangePasswordPage />}
        path="change"
      />
    </Route>

    {/* Account Management */}
    <Route path="account">
      <Route
        element={<DeleteAccountPage />}
        path="delete"
      />
    </Route>
  </Route>
);
