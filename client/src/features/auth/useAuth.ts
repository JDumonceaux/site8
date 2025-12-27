import { useAuthState } from './useAuthState';
import { usePasswordManagement } from './usePasswordManagement';
import { useSession } from './useSession';
import { useSignIn } from './useSignIn';
import { useSignUp } from './useSignUp';

export { SocialProvider, type SocialProvider } from './types';

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

  // Derived values
  const initial = authState.email
    ? authState.email.slice(0, 1).toUpperCase()
    : undefined;
  const authorized = authState.accessToken;

  return {
    // State
    accessToken: authState.accessToken,
    authorized,
    email: authState.email,
    error: authState.error,
    idToken: authState.idToken,
    initial,
    isLoading: authState.isLoading,
    signInDetails: authState.signInDetails,
    userId: authState.userId,
    username: authState.username,

    // Sign-in operations
    authAutoSignIn: signInOps.authAutoSignIn,
    authSignIn: signInOps.authSignIn,
    authSignInWithRedirect: signInOps.authSignInWithRedirect,
    authSignOut: signInOps.authSignOut,

    // Sign-up operations
    authConfirmSignUp: (eMailAddress: string, code: string) =>
      signUpOps.authConfirmSignUp(eMailAddress, code, signInOps.authAutoSignIn),
    authResendConfirmationCode: signUpOps.authResendConfirmationCode,
    authSignUp: (eMailAddress: string, password: string) =>
      signUpOps.authSignUp(eMailAddress, password, signInOps.authAutoSignIn),

    // Password management
    authConfirmResetPassword: passwordOps.authConfirmResetPassword,
    authResetPassword: passwordOps.authResetPassword,
    authUpdatePassword: passwordOps.authUpdatePassword,

    // Session and user management
    authDeleteUser: sessionOps.authDeleteUser,
    authFetchAuthSession: sessionOps.authFetchAuthSession,
    authFetchDevices: sessionOps.authFetchDevices,
    authFetchUserAttributes: sessionOps.authFetchUserAttributes,
    authForgetDevice: sessionOps.authForgetDevice,
    authGetCurrentUser: sessionOps.authGetCurrentUser,
    authRefreshAuthSession: sessionOps.authRefreshAuthSession,
    authRememberDevice: sessionOps.authRememberDevice,
    currentAuthenticatedUser: sessionOps.currentAuthenticatedUser,
  };
};

export default useAuth;
