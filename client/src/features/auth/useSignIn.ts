import { useNavigate } from 'react-router-dom';

import {
  autoSignIn,
  signIn,
  type SignInOutput,
  signInWithRedirect,
  signOut,
} from 'aws-amplify/auth';

import { useAuthAsync } from './useAuthAsync';
import type { AuthState } from './useAuthState';
import type { SocialProvider } from './types';

/**
 * Hook for sign-in operations
 */
export const useSignIn = (authState: AuthState) => {
  const { setAccessToken, setIdToken } = authState;
  const { executeAuthOperation } = useAuthAsync(authState);
  const navigate = useNavigate();

  /**
   * Handle sign-in flow steps and navigation
   */
  const handleSignInStep = (step: SignInOutput['nextStep']) => {
    switch (step.signInStep) {
      case 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE': {
        // The sign-in must be confirmed with a custom challenge response.
        // Complete the process with confirmSignIn
        break;
      }
      case 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED': {
        // The user was created with a temporary password and must set a new one.
        // Complete the process with confirmSignIn.
        void navigate('/password-reset');
        break;
      }
      case 'CONFIRM_SIGN_IN_WITH_SMS_CODE': {
        // The sign-in must be confirmed with a SMS code from the user.
        // Complete the process with confirmSignIn
        break;
      }
      case 'CONFIRM_SIGN_IN_WITH_TOTP_CODE': {
        // ??  Time-based One-Time Password
        // The sign-in must be confirmed with a TOTP code from the user.
        // Complete the process with confirmSignIn.
        break;
      }
      case 'CONFIRM_SIGN_UP': {
        // Validation code is sent to the user's email during sign-up
        //  The user hasn't completed the sign-up flow fully and must be confirmed via confirmSignUp
        void navigate('/confirm');
        break;
      }
      case 'CONTINUE_SIGN_IN_WITH_MFA_SELECTION': {
        // The user must select their mode of MFA verification before signing in.
        // Complete the process with confirmSignIn
        break;
      }
      case 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP': {
        // ??  Time-based One-Time Password
        // The TOTP setup process must be continued.
        // Complete the process with confirmSignIn.
        break;
      }
      case 'DONE': {
        // User is signed in
        // The sign in process has been completed.
        void navigate('/');
        break;
      }
      case 'RESET_PASSWORD': {
        //  The user must reset their password via resetPassword
        void navigate('/password-reset');
        break;
      }
      default: {
        break;
      }
    }
  };

  /**
   * Sign in user after confirmation (auto sign-in)
   */
  const authAutoSignIn = async () => {
    await executeAuthOperation(async () => {
      const { nextStep } = await autoSignIn();
      handleSignInStep(nextStep);
    });
  };

  /**
   * Standard sign-in with email and password
   */
  const authSignIn = async (eMailAddress: string, password: string) => {
    await executeAuthOperation(async () => {
      const { nextStep } = await signIn({
        options: {
          // USER_SRP_AUTH: Default flow type.
          // SRP protocol(Secure Remote Password) where the password never leaves the client
          // and is unknown to the server.
          // This is the recommended flow and is used by default.
          authFlowType: 'USER_SRP_AUTH',
          // USER_PASSWORD_AUTH: No encryption is used for the password.
          // CUSTOM_WITH_SRP: Custom authentication flow with SRP.
          // CUSTOM_WITHOUT_SRP: Custom authentication flow without SRP.
        },
        password,
        username: eMailAddress,
      });
      handleSignInStep(nextStep);
    });
  };

  /**
   * Sign in with social provider (Amazon, Apple, Facebook, Google)
   * Redirects to Cognito Hosted UI or federates directly with provider
   */
  const authSignInWithRedirect = async (provider: SocialProvider) => {
    await executeAuthOperation(async () => {
      await signInWithRedirect({
        provider,
      });
    });
  };

  /**
   * Sign out from all devices
   */
  const authSignOut = async () => {
    await executeAuthOperation(async () => {
      // Signout of all devices
      setAccessToken(undefined);
      setIdToken(undefined);
      await signOut({ global: true });
    });
  };

  return {
    authAutoSignIn,
    authSignIn,
    authSignInWithRedirect,
    authSignOut,
  };
};
