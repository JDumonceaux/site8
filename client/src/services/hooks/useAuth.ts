import { confirmSignUp, signUp } from 'aws-amplify/auth';
import { useState } from 'react';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpUser = async (eMailAddress: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const { nextStep } = await signUp({
        // This is weird, but apparently you have to pass the email as the username
        // however, Congnito doesn't save the email as the user name, but instead
        // creates a UUID for the username - so the
        // email can be changed later.
        username: eMailAddress,
        password,
        // options: {
        //   authFlowType: 'USER_SRP_AUTH',
        // },
        //   // optional
        //   autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        // },
      });
      console.log(nextStep);
    } catch (error: unknown) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmUser = async (eMailAddress: string, code: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const { nextStep } = await confirmSignUp({
        username: eMailAddress,
        authenticationCode: code,
      });
      console.log(nextStep);
    } catch (error: unknown) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const usernameAvailable = async (username: string) => {
    // adapted from @herri16's solution: https://github.com/aws-amplify/amplify-js/issues/1067#issuecomment-436492775
    try {
      await confirmSignUp({
        username: username,
        confirmationCode: '000000',
      });
      // this should always throw an error of some kind, but if for some reason this succeeds then the user probably exists.
      return false;
    } catch (err: AuthValidationErrorCode) {
      switch (err.code) {
        case 'UserNotFoundException':
          return true;
        case 'NotAuthorizedException':
          return false;
        case 'AliasExistsException':
          // Email alias already exists
          return false;
        case 'CodeMismatchException':
          return false;
        case 'ExpiredCodeException':
          return false;
        default:
          return false;
      }
    }
  };

  // async function resendConfirmationCode() {
  //   try {
  //       await Auth.resendSignUp(username);
  //       console.log('code resent successfully');
  //   } catch (err) {
  //       console.log('error resending code: ', err);
  //   }
  // }

  return {
    signUpUser: signUpUser,
    confirmUser: confirmUser,
    usernameAvailable,
    isLoading,
  };
};

export default useAuth;
