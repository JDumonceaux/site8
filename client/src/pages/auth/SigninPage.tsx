import { Meta } from 'components/common/Meta';
import { styled } from 'styled-components';

import { APP_NAME } from 'utils/constants';
import { useEffect, useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { Button, TextInput } from 'components/ui/Form';
import { TwoColumn } from 'components/ui/TwoColumn';

export const SigninPage = (): JSX.Element => {
  const title = 'Sign-In';

  const navigate = useNavigate();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Login');
      console.log(username);
      console.log(password);

      // await signIn(username, password);

      // props.updateAuthStatus(true);

      // options: {
      //   authFlowType: 'USER_SRP_AUTH',
      // },
      ///navigate('/contacts');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, []);

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <StyledGrid>
          <div>
            <StyledH1>Sign In</StyledH1>
            <form>
              <TextInput
                id="email_address"
                inputMode="email"
                label="Email Address"
                onChange={(evt) => setUserName(evt.target.value)}
                placeholder="Enter Email Address"
              />
              <TextInput
                id="password"
                inputMode="text"
                label="Password"
                onChange={(evt) => setPassword(evt.target.value)}
                placeholder="Enter Password"
                //type="password"
              />
              <TwoColumn includeGap includeMargin>
                <Button id="cancel" variant="secondary">
                  Cancel
                </Button>
                <Button id="login" onClick={handleLogin} type="submit">
                  Login
                </Button>
              </TwoColumn>
            </form>
            <Link to="/signup">
              <Button id="signup">Sign Up</Button>
            </Link>
          </div>
          <div>
            <img alt="" src="/images/face.png" />
          </div>
        </StyledGrid>
      </StyledMain>
    </>
  );
};

export default SigninPage;

const StyledMain = styled.main`
  background-color: #fff;
  background-size: contain;
`;
const StyledGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  max-width: 940px;
  margin: 0 auto;
  margin-top: 20px;
  > div:first-child {
    width: 360px;
  }
  > div:nth-child(2) {
    margin: 0 auto;
    padding: 0 40px;
  }
`;
const StyledH1 = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
`;
