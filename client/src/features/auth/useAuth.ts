import { useState } from 'react';

import {
  AuthError,
  autoSignIn,
  confirmResetPassword,
  confirmSignUp,
  deleteUser,
  fetchAuthSession,
  fetchDevices,
  fetchUserAttributes,
  forgetDevice,
  getCurrentUser,
  rememberDevice,
  resendSignUpCode,
  resetPassword,
  signIn,
  signInWithRedirect,
  signOut,
  signUp,
  updatePassword,
  type FetchUserAttributesOutput,
  type JWT,
  type ResetPasswordOutput,
  type SignInOutput,
  type SignUpOutput,
} from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

export const enum SocialProvider {
  AMAZON = 'Amazon',
  APPLE = 'Apple',
  FACEBOOK = 'Facebook',
  GOOGLE = 'Google',
}

// In Amplify the localStorage is the default storage mechanism.
// It saves the tokens in the browser's localStorage.
// This local storage will persist across browser sessions and tabs.
// You can change to cookie storage, browser session storage, or custom storage
// if desired.

// autoSignIn
// confirmResetPassword
// deleteUser
// fetchAuthSession
// fetchDevices
// forgetDevice
// getCurrentUser
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
  const [error, setError] = useState<null | { code: string; message: string }>(
    null,
  );
  const [accessToken, setAccessToken] = useState<JWT | undefined>();
  const [idToken, setIdToken] = useState<JWT | undefined>();
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState<string | undefined>('');
  const [signInDetails, setSignInDetails] = useState<unknown>();
  const navigate = useNavigate();

  const handleError = (error: unknown): void => {
    if (error instanceof AuthError) {
      setError({ code: error.name, message: error.message });
    } else {
      setError({
        code: '',
        message: error instanceof Error ? error.message : 'Unknown Error',
      });
    }
  };

  const handleResetPasswordNextStep = (
    step: ResetPasswordOutput['nextStep'],
  ) => {
    switch (step.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE': {
        // The user needs to complete the sign-in process with a code
        const { codeDeliveryDetails } = step;
        console.log('Code sent to :', codeDeliveryDetails.deliveryMedium);
        break;
      }
      case 'DONE': {
        // The user has successfully changed their password
        navigate('/');
        break;
      }
    }
  };

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
        navigate('/password-reset');
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
        navigate('/confirm');
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
        navigate('/');
        break;
      }
      case 'RESET_PASSWORD': {
        //  The user must reset their password via resetPassword
        navigate('/password-reset');
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleSignUpStep = (step: SignUpOutput['nextStep']) => {
    console.log('step.signUpStep', step.signUpStep);
    switch (step.signUpStep) {
      case 'COMPLETE_AUTO_SIGN_IN': {
        // The user needs to complete the sign-in process with a code
        const { codeDeliveryDetails } = step;
        if (codeDeliveryDetails) {
          // Redirect user to confirm-sign-up with link screen.
          navigate('/confirm');
        } else {
          // Perform auto sign-in
          authAutoSignIn();
        }
        break;
      }
      case 'CONFIRM_SIGN_UP': {
        // Validation code is sent to the user's email during sign-up
        //  The user hasn't completed the sign-up flow fully and must be confirmed via confirmSignUp
        navigate('/confirm');
        break;
      }
      case 'DONE': {
        // The user has been successfully signed up
        navigate('/');
        break;
      }
      default: {
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
        confirmationCode: code,
        newPassword,
        username: eMailAddress,
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
        confirmationCode: code,
        username: eMailAddress,
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

  const authFetchAuthSession = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
      setAccessToken(accessToken);
      setIdToken(idToken);
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const authRefreshAuthSession = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const { tokens } = await fetchAuthSession({
        forceRefresh: true,
      });
      setAccessToken(tokens?.accessToken);
      setIdToken(tokens?.idToken);
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

  const handleGetCurrentUser = (
    username: string,
    userId: string,
    signInDetails: unknown,
  ): void => {
    setUsername(username);
    setUserId(userId);
    setSignInDetails(signInDetails);
  };

  const authGetCurrentUser = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const { signInDetails, userId, username } = await getCurrentUser();
      handleGetCurrentUser(username, userId, signInDetails);
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchUserAttributes = (data: FetchUserAttributesOutput): void => {
    setEmail(data.email);
  };

  const authFetchUserAttributes = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await fetchUserAttributes();
      handleFetchUserAttributes(data);
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
        provider,
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
      setAccessToken(undefined);
      setIdToken(undefined);
      await signOut({ global: true });
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
        newPassword,
        oldPassword,
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
      await currentAuthenticatedUser();
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const initial = email ? email.slice(0, 1).toUpperCase() : undefined;
  const authorized = accessToken;

  return {
    accessToken,
    authAutoSignIn,
    authConfirmResetPassword,
    authConfirmSignUp,
    authDeleteUser,
    authFetchAuthSession,
    authFetchDevices,
    authFetchUserAttributes,
    authForgetDevice,
    authGetCurrentUser,
    authorized,
    authRefreshAuthSession,
    authRememberDevice,
    authResendConfirmationCode,
    authResetPassword,
    authSignIn,
    authSignInWithRedirect,
    authSignOut,
    authSignUp,
    authUpdatePassword,
    currentAuthenticatedUser,
    email,
    error,
    idToken,
    initial,
    isLoading,
    signInDetails,
    userId,
    username,
  };
};

export default useAuth;
