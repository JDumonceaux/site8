import { useEffect, useState } from 'react';
import { Hub } from 'aws-amplify/utils';
import {
  signInWithRedirect,
  signOut,
  getCurrentUser,
  AuthUser,
} from 'aws-amplify/auth';

const AuthPage = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<unknown>(null);
  const [customState, setCustomState] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signInWithRedirect':
          getUser();
          break;
        case 'signInWithRedirect_failure':
          setError('An error has occurred during the OAuth flow.');
          break;
        case 'customOAuthState':
          setCustomState(payload.data); // this is the customState provided on signInWithRedirect function
          break;
      }
    });

    getUser();

    return unsubscribe;
  }, []);

  const getUser = async (): Promise<void> => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
      console.log('Not signed in');
    }
  };

  return (
    <div className="App">
      <button
        // eslint-disable-next-line sonarjs/no-duplicate-string
        onClick={() => signInWithRedirect({ customState: 'shopping-cart' })}
        type="button">
        Open Hosted UI
      </button>
      <button
        onClick={() =>
          signInWithRedirect({
            provider: 'Facebook',
            customState: 'shopping-cart',
          })
        }
        type="button">
        Open Facebook
      </button>
      <button
        onClick={() =>
          signInWithRedirect({
            provider: 'Google',
            customState: 'shopping-cart',
          })
        }
        type="button">
        Open Google
      </button>
      <button
        onClick={() =>
          signInWithRedirect({
            provider: 'Amazon',
            customState: 'shopping-cart',
          })
        }
        type="button">
        Open Amazon
      </button>
      <button
        onClick={() =>
          signInWithRedirect({
            provider: 'Apple',
            customState: 'shopping-cart',
          })
        }
        type="button">
        Open Apple
      </button>
      <button onClick={() => signOut()} type="button">
        Sign Out
      </button>
      <div>{user?.username}</div>
      <div>{customState}</div>
    </div>
  );
};

export default AuthPage;