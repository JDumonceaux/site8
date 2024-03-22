import {
  confirmSignUp,
  signUp,
  AuthError,
  resendSignUpCode,
  SignUpOutput,
  SignInOutput,
  signIn,
  signOut,
  resetPassword,
  ResetPasswordOutput,
  confirmResetPassword,
  autoSignIn,
  signInWithRedirect,
  updatePassword,
  rememberDevice,
  forgetDevice,
  fetchDevices,
  deleteUser,
} from 'aws-amplify/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const enum SocialProvider {
  AMAZON = 'Amazon',
  APPLE = 'Apple',
  FACEBOOK = 'Facebook',
  GOOGLE = 'Google',
}

// autoSignIn
// confirmResetPassword
// deleteUser
// fetchDevices
// forgetDevice
// rememberDevice
// resendSignUpCode
// resetPassword
// signIn
// signOut
// signUp
// signInWithRedirect
// updatePassword

// confirmSignIn
// confirmSignUp
// confirmUserAttribute

// deleteUserAttributes
// fetchMFAPreference
// fetchUserAttributes
// getCurrentUser
// sendUserAttributeVerification
// setUpTOTP
// signInWithCustomAuth
// signInWithCustomSRPAuth
// signInWithSRP
// signInWithUserPassword
// updateMFAPreference
// updateUserAttribute
// updateUserAttributes
// verifyTOTPSetup

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleError = (error: unknown): void => {
    const err = error as AuthError | null;
    if (err) {
      // Handle the error here
      setError(err.message);
    }
  };

  const handleResetPasswordNextStep = (
    step: ResetPasswordOutput['nextStep'],
  ) => {
    switch (step.resetPasswordStep) {
      case 'DONE':
        // The user has successfully changed their password
        navigate('/');
        break;
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE': {
        // The user needs to complete the sign-in process with a code
        const codeDeliveryDetails = step.codeDeliveryDetails;
        console.log('Code sent to :', codeDeliveryDetails.deliveryMedium);
        break;
      }
    }
  };

  const handleSignInStep = (step: SignInOutput['nextStep']) => {
    switch (step.signInStep) {
      case 'DONE':
        // User is signed in
        // The sign in process has been completed.
        navigate('/');
        break;
      case 'CONFIRM_SIGN_UP':
        // Validation code is sent to the user's email during sign-up
        //  The user hasn't completed the sign-up flow fully and must be confirmed via confirmSignUp
        navigate('/confirm');
        break;
      case 'RESET_PASSWORD':
        //  The user must reset their password via resetPassword
        navigate('/password-reset');
        break;
      case 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED':
        // The user was created with a temporary password and must set a new one.
        // Complete the process with confirmSignIn.
        navigate('/password-reset');
        break;
      case 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE':
        // The sign-in must be confirmed with a custom challenge response.
        // Complete the process with confirmSignIn
        break;
      case 'CONTINUE_SIGN_IN_WITH_MFA_SELECTION':
        // The user must select their mode of MFA verification before signing in.
        // Complete the process with confirmSignIn
        break;
      case 'CONFIRM_SIGN_IN_WITH_SMS_CODE':
        // The sign-in must be confirmed with a SMS code from the user.
        // Complete the process with confirmSignIn
        break;
      case 'CONFIRM_SIGN_IN_WITH_TOTP_CODE':
        // ??  Time-based One-Time Password
        // The sign-in must be confirmed with a TOTP code from the user.
        // Complete the process with confirmSignIn.
        break;
      case 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP':
        // ??  Time-based One-Time Password
        // The TOTP setup process must be continued.
        // Complete the process with confirmSignIn.
        break;
      default:
        break;
    }
  };

  const handleSignUpStep = (step: SignUpOutput['nextStep']) => {
    switch (step.signUpStep) {
      case 'DONE':
        // The user has been successfully signed up
        navigate('/');
        break;
      case 'COMPLETE_AUTO_SIGN_IN': {
        // The user needs to complete the sign-in process with a code
        const codeDeliveryDetails = step.codeDeliveryDetails;
        if (codeDeliveryDetails) {
          // Redirect user to confirm-sign-up with link screen.
          navigate('/confirm');
        } else {
          // Perform auto sign-in
          authAutoSignIn();
        }
        break;
      }
    }
  };

  // Sign-up flow - Step #4 - Sign in user after confirmation
  const authAutoSignIn = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const { nextStep } = await autoSignIn();
      console.log(nextStep);
      handleSignInStep(nextStep);
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Complete password rest with code
  const authConfirmResetPassword = async (
    eMailAddress: string,
    code: string,
    newPassword: string,
  ) => {
    try {
      setError(null);
      setIsLoading(true);
      await confirmResetPassword({
        username: eMailAddress,
        confirmationCode: code,
        newPassword,
      });
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign-up flow - Step #2 - Confirm the sign-up with code emailed to auth
  const authConfirmSignUp = async (eMailAddress: string, code: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const { nextStep } = await confirmSignUp({
        username: eMailAddress,
        confirmationCode: code,
      });
      console.log(nextStep);
      handleSignUpStep(nextStep);
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const authDeleteUser = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await deleteUser();
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const authFetchDevices = async () => {
    try {
      setError(null);
      setIsLoading(true);
      return await fetchDevices();
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
    return undefined;
  };

  const authForgetDevice = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await forgetDevice();
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Not available if
  // the federated OAuth flow with Cognito User Pools or Hosted UI is used, or
  // the User Pool uses email/phone_number or alias sign-in method, or
  // when the signIn API uses the USER_PASSWORD_AUTH as the authFlowType.
  const authRememberDevice = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await rememberDevice();
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign-up flow - Step #4 - Resend the confirmation code
  const authResendConfirmationCode = async (eMailAddress: string) => {
    try {
      setError(null);
      setIsLoading(true);
      await resendSignUpCode({
        username: eMailAddress,
      });
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Send a reset code to the destination (e.g. email or SMS) based on the user's settings.
  const authResetPassword = async (eMailAddress: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const { nextStep } = await resetPassword({
        username: eMailAddress,
      });
      handleResetPasswordNextStep(nextStep);
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Typical Sign-In flow
  const authSignIn = async (eMailAddress: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const { nextStep } = await signIn({
        username: eMailAddress,
        password,
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
      });
      handleSignInStep(nextStep);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Social provider sign-in flow
  // Redirect the user to the Cognito Hosted UI
  // Also, note that passing Amazon, Apple, Facebook or Google on the provider argument
  // (e.g signInWithRedirect({ provider: 'Amazon' })) will bypass the Hosted UI and
  // federate immediately with the social provider as shown in the below example.
  const authSignInWithRedirect = async (provider: SocialProvider) => {
    try {
      setError(null);
      setIsLoading(true);
      await signInWithRedirect({
        provider: provider,
      });
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const authSignOut = async () => {
    try {
      setError(null);
      setIsLoading(true);
      // Signout of all devices
      const result = await signOut({ global: true });
      console.log('Result: ', result);
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign-Up flow - Step #1 - Enter userName (email) and password
  const authSignUp = async (eMailAddress: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const { nextStep } = await signUp({
        // This is weird, but apparently you have to pass the email as the username
        // however, Congnito doesn't save the email as the auth name, but instead
        // creates a UUID for the username - so the
        // email can be changed later.
        username: eMailAddress,
        password,
        options: {
          userAttributes: {
            // email,
            // phone_number // E.164 number convention
          },
          // optional
          // autoSignIn: true skips the user confirmation code step and signs the user up immediately
          // autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        },
      });
      handleSignUpStep(nextStep);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Change password
  const authUpdatePassword = async (
    oldPassword: string,
    newPassword: string,
  ) => {
    try {
      setError(null);
      setIsLoading(true);
      await updatePassword({
        oldPassword,
        newPassword,
      });
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentAuthenticatedUser = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await currentAuthenticatedUser();
      console.log('Result: ', result);
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  //   const usernameAvailable = async (username: string) => {
  //     // adapted from @herri16's solution: https://github.com/aws-amplify/amplify-js/issues/1067#issuecomment-436492775
  //     try {
  //       await confirmSignUp({
  //         username: username,
  //         confirmationCode: '000000',
  //       });
  //       // this should always throw an error of some kind, but if for some reason this succeeds then the user probably exists.
  //       return false;
  //     } catch (err: unknown) {
  //       // switch (err.code) {
  //       //   case 'UserNotFoundException':
  //       //     return true;
  //       //   case 'NotAuthorizedException':
  //       //     return false;
  //       //   case 'AliasExistsException':
  //       //     // Email alias already exists
  //       //     return false;
  //       //   case 'CodeMismatchException':
  //       //     return false;
  //       //   case 'ExpiredCodeException':
  //       //     return false;
  //       //   default:
  //       //     return false;
  //       // }
  //     }
  //     return false;
  //   };

  return {
    authAutoSignIn,
    authConfirmResetPassword,
    authConfirmSignUp,
    authDeleteUser,
    authFetchDevices,
    authForgetDevice,
    authRememberDevice,
    authResendConfirmationCode,
    authResetPassword,
    authSignIn,
    authSignInWithRedirect,
    authSignOut,
    authSignUp,
    authUpdatePassword,

    currentAuthenticatedUser,
    isLoading,
    error,
  };
};

export default useAuth;
