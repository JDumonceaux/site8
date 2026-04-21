// Route configuration files export JSX elements, not components — fast-refresh warning suppressed intentionally.
/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { Route } from 'react-router-dom';

// ---------------------
// Layout
// ---------------------
const UnifiedLayout = lazy(
  async () => import('../../feature/layouts/unified-layout/UnifiedLayout'),
);

// ---------------------
// Auth Pages
// ---------------------
const SigninPage = lazy(async () => import('../../feature/auth/SigninPage'));
const SignoutPage = lazy(async () => import('../../feature/auth/SignoutPage'));
const SignupPage = lazy(async () => import('../../feature/auth/SignupPage'));
const ConfirmEmailPage = lazy(
  async () => import('../../feature/auth/ConfirmEmailPage'),
);
const ForgotPasswordPage = lazy(
  async () => import('../../feature/auth/ForgotPasswordPage'),
);
const ChangePasswordPage = lazy(
  async () => import('../../feature/auth/ChangePasswordPage'),
);
const DeleteAccountPage = lazy(
  async () => import('../../feature/auth/DeleteAccountPage'),
);

/**
 * Authentication routes for unauthenticated users
 * Includes signin, signup, password management, and account deletion
 */
export const authRoutes = (
  <Route element={<UnifiedLayout hasHeader />}>
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
