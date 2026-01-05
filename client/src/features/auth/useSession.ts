import {
  deleteUser,
  fetchAuthSession,
  fetchDevices,
  fetchUserAttributes,
  type FetchUserAttributesOutput,
  forgetDevice,
  getCurrentUser,
  rememberDevice,
} from 'aws-amplify/auth';
import { useAuthAsync } from './useAuthAsync';
import type { AuthState } from './useAuthState';

/**
 * Hook for session and user management operations
 */
export const useSession = (authState: AuthState) => {
  const {
    setAccessToken,
    setEmail,
    setIdToken,
    setSignInDetails,
    setUserId,
    setUsername,
  } = authState;
  const { executeAuthOperation } = useAuthAsync(authState);

  /**
   * Fetch current authentication session and tokens
   */
  const authFetchAuthSession = async () => {
    await executeAuthOperation(async () => {
      const session = await fetchAuthSession();
      const { accessToken: sessionAccessToken, idToken: sessionIdToken } =
        session.tokens ?? {};
      setAccessToken(sessionAccessToken);
      setIdToken(sessionIdToken);
    });
  };

  /**
   * Refresh authentication session with force refresh
   */
  const authRefreshAuthSession = async () => {
    await executeAuthOperation(async () => {
      const { tokens } = await fetchAuthSession({
        forceRefresh: true,
      });
      setAccessToken(tokens?.accessToken);
      setIdToken(tokens?.idToken);
    });
  };

  /**
   * Get current authenticated user info
   */
  const authGetCurrentUser = async () => {
    await executeAuthOperation(async () => {
      const {
        signInDetails: currentSignInDetails,
        userId: currentUserId,
        username: currentUsername,
      } = await getCurrentUser();
      setUsername(currentUsername);
      setUserId(currentUserId);
      setSignInDetails(currentSignInDetails);
    });
  };

  /**
   * Fetch user attributes (email, phone, etc.)
   */
  const authFetchUserAttributes = async () => {
    await executeAuthOperation(async () => {
      const data: FetchUserAttributesOutput = await fetchUserAttributes();
      setEmail(data.email);
    });
  };

  /**
   * Delete the current user account
   */
  const authDeleteUser = async () => {
    await executeAuthOperation(async () => {
      await deleteUser();
    });
  };

  /**
   * Fetch list of devices for the current user
   */
  const authFetchDevices = async (): Promise<unknown> => {
    const result = await executeAuthOperation(async () => {
      return fetchDevices();
    });
    return result ?? null;
  };

  /**
   * Forget (remove) the current device
   */
  const authForgetDevice = async () => {
    await executeAuthOperation(async () => {
      await forgetDevice();
    });
  };

  /**
   * Remember the current device for future logins
   * Not available if:
   * - Federated OAuth flow with Cognito User Pools or Hosted UI is used
   * - User Pool uses email/phone_number or alias sign-in method
   * - signIn API uses USER_PASSWORD_AUTH as authFlowType
   */
  const authRememberDevice = async () => {
    await executeAuthOperation(async () => {
      await rememberDevice();
    });
  };

  return {
    authDeleteUser,
    authFetchAuthSession,
    authFetchDevices,
    authFetchUserAttributes,
    authForgetDevice,
    authGetCurrentUser,
    authRefreshAuthSession,
    authRememberDevice,
  };
};
