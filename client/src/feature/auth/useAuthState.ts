import { useState } from 'react';

import { AuthError, type JWT } from 'aws-amplify/auth';

/**
 * Shared authentication state and error handling
 */
export const useAuthState = () => {
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

  const handleError = (errorValue: unknown): void => {
    if (errorValue instanceof AuthError) {
      setError({ code: errorValue.name, message: errorValue.message });
    } else {
      setError({
        code: '',
        message:
          errorValue instanceof Error ? errorValue.message : 'Unknown Error',
      });
    }
  };

  const clearError = () => { setError(null); };

  return {
    accessToken,
    clearError,
    email,
    error,
    handleError,
    idToken,
    isLoading,
    setAccessToken,
    setEmail,
    setIdToken,
    setIsLoading,
    setSignInDetails,
    setUserId,
    setUsername,
    signInDetails,
    userId,
    username,
  };
};

export type AuthState = ReturnType<typeof useAuthState>;
