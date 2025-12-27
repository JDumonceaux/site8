import { useNavigate } from 'react-router-dom';

import {
  confirmSignUp,
  resendSignUpCode,
  signUp,
  type SignUpOutput,
} from 'aws-amplify/auth';

import { useAuthAsync } from './useAuthAsync';
import type { AuthState } from './useAuthState';

/**
 * Hook for sign-up operations
 */
export const useSignUp = (authState: AuthState) => {
  const { executeAuthOperation } = useAuthAsync(authState);
  const navigate = useNavigate();

  /**
   * Handle sign-up flow steps and navigation
   */
  const handleSignUpStep = (
    step: SignUpOutput['nextStep'],
    authAutoSignIn: () => Promise<void>,
  ) => {
    switch (step.signUpStep) {
      case 'COMPLETE_AUTO_SIGN_IN': {
        // The user needs to complete the sign-in process with a code
        const { codeDeliveryDetails } = step;
        if (codeDeliveryDetails) {
          // Redirect user to confirm-sign-up with link screen.
          void navigate('/confirm');
        } else {
          // Perform auto sign-in
          void authAutoSignIn();
        }
        break;
      }
      case 'CONFIRM_SIGN_UP': {
        // Validation code is sent to the user's email during sign-up
        //  The user hasn't completed the sign-up flow fully and must be confirmed via confirmSignUp
        void navigate('/confirm');
        break;
      }
      case 'DONE': {
        // The user has been successfully signed up
        void navigate('/');
        break;
      }
      default: {
        break;
      }
    }
  };

  /**
   * Confirm sign-up with verification code
   */
  const authConfirmSignUp = async (
    eMailAddress: string,
    code: string,
    authAutoSignIn: () => Promise<void>,
  ) => {
    await executeAuthOperation(async () => {
      const { nextStep } = await confirmSignUp({
        confirmationCode: code,
        username: eMailAddress,
      });
      console.log(nextStep);
      handleSignUpStep(nextStep, authAutoSignIn);
    });
  };

  /**
   * Resend the confirmation code to user's email
   */
  const authResendConfirmationCode = async (eMailAddress: string) => {
    await executeAuthOperation(async () => {
      await resendSignUpCode({
        username: eMailAddress,
      });
    });
  };

  /**
   * Sign up a new user with email and password
   */
  const authSignUp = async (
    eMailAddress: string,
    password: string,
    authAutoSignIn: () => Promise<void>,
  ) => {
    await executeAuthOperation(async () => {
      const { nextStep } = await signUp({
        // This is weird, but apparently you have to pass the email as the username
        // however, Cognito doesn't save the email as the auth name, but instead
        // creates a UUID for the username
        options: {
          userAttributes: {
            // email,
            // phone_number // E.164 number convention
          },
          // optional
          // autoSignIn: true skips the user confirmation code step and signs the user up immediately
          // autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        },
        password,
        // email can be changed later.
        username: eMailAddress,
      });
      handleSignUpStep(nextStep, authAutoSignIn);
    });
  };

  return {
    authConfirmSignUp,
    authResendConfirmationCode,
    authSignUp,
  };
};
