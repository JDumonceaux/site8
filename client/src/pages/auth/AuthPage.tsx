import { useEffect, useState } from 'react';
import { Hub } from 'aws-amplify/utils';
import {
  signInWithRedirect,
  signOut,
  getCurrentUser,
  AuthUser,
} from 'aws-amplify/auth';
import {
  Authenticator,
  WithAuthenticatorProps,
  withAuthenticator,
} from '@aws-amplify/ui-react';

const AuthPage = ({ signOut, user }: WithAuthenticatorProps) => {
  const [user1, setUser1] = useState<AuthUser | null>(null);
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
      setUser1(currentUser);
    } catch (error) {
      console.error(error);
      console.log('Not signed in');
    }
  };

  return (
    <div className="App">
      <h1>Hello {user?.username}</h1>
      <button
        // eslint-disable-next-line sonarjs/no-duplicate-string
        onClick={() => signInWithRedirect({ customState: 'shopping-cart' })}
        type="button">
        Open Hosted UI
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
      <button onClick={() => signOut()} type="button">
        Sign Out
      </button>
      <div>{user?.username}</div>
      <div>{customState}</div>
      <div>
        <Authenticator />
      </div>
    </div>
  );
};

export default withAuthenticator(AuthPage);
