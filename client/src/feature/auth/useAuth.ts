import { useCallback } from 'react';

import { useAuthState } from './useAuthState';
import { usePasswordManagement } from './usePasswordManagement';
import { useSession } from './useSession';
import { useSignIn } from './useSignIn';
import { useSignUp } from './useSignUp';

export type { SocialProvider } from './types';

/**
 * Main authentication hook - composes smaller focused hooks
 *
 * This hook has been refactored into smaller, focused hooks for better maintainability:
 * - useAuthState: Shared state and error handling
 * - useSignIn: Sign-in operations
 * - useSignUp: Sign-up operations
 * - usePasswordManagement: Password reset and update
 * - useSession: Session, tokens, and user info management
 */
const useAuth = () => {
  // Shared state and error handling
  const authState = useAuthState();

  // Sign-in operations
  const signInOps = useSignIn(authState);

  // Session and user management
  const sessionOps = useSession(authState);

  // Password management
  const passwordOps = usePasswordManagement(authState);

  // Sign-up operations (needs authAutoSignIn from signInOps)
  const signUpOps = useSignUp(authState);

  const authConfirmSignUp = useCallback(
    async (eMailAddress: string, code: string) =>
      signUpOps.authConfirmSignUp(eMailAddress, code, signInOps.authAutoSignIn),
    [signUpOps, signInOps],
  );

  const authSignUp = useCallback(
    async (eMailAddress: string, password: string) =>
      signUpOps.authSignUp(eMailAddress, password, signInOps.authAutoSignIn),
    [signUpOps, signInOps],
  );

  // Derived values
  const initial = authState.email
    ? authState.email.at(0)?.toUpperCase()
    : undefined;
  const authorized = authState.accessToken != null;

  return {
    // State
    accessToken: authState.accessToken,
    // Sign-in operations
    authAutoSignIn: signInOps.authAutoSignIn,
    // Password management
    authConfirmResetPassword: passwordOps.authConfirmResetPassword,
    // Sign-up operations
    authConfirmSignUp,
    // Session and user management
    authDeleteUser: sessionOps.authDeleteUser,
    authFetchAuthSession: sessionOps.authFetchAuthSession,
    authFetchDevices: sessionOps.authFetchDevices,
    authFetchUserAttributes: sessionOps.authFetchUserAttributes,
    authForgetDevice: sessionOps.authForgetDevice,
    authGetCurrentUser: sessionOps.authGetCurrentUser,

    authorized,
    authRefreshAuthSession: sessionOps.authRefreshAuthSession,
    authRememberDevice: sessionOps.authRememberDevice,
    authResendConfirmationCode: signUpOps.authResendConfirmationCode,

    authResetPassword: passwordOps.authResetPassword,
    authSignIn: signInOps.authSignIn,
    authSignInWithRedirect: signInOps.authSignInWithRedirect,

    authSignOut: signInOps.authSignOut,
    authSignUp,
    authUpdatePassword: passwordOps.authUpdatePassword,

    email: authState.email,
    error: authState.error,
    idToken: authState.idToken,
    initial,
    isLoading: authState.isLoading,
    signInDetails: authState.signInDetails,
    userId: authState.userId,
    username: authState.username,
  };
};

export default useAuth;
