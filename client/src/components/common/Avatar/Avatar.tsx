'use client';

import { useEffect } from 'react';
import useAuth from 'hooks/useAuth';
import { styled } from 'styled-components';
import StyledLink from '../Link/StyledLink/StyledLink';

export const Avatar = (): JSX.Element => {
  const { authFetchUserAttributes, authFetchAuthSession, initial, authorized } =
    useAuth();

  useEffect(() => {
    authFetchAuthSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authorized) {
      authFetchUserAttributes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized]);

  return (
    <StyledDiv data-testid="avatar">
      {authorized ? (
        <>
          {initial ? <StyledIcon>{initial}</StyledIcon> : null}
          <StyledMenu>
            <StyledLink to="/signout">Sign Out</StyledLink>
            <MenuContent>
              <StyledLink to="/password/change">Change Password</StyledLink>
              <StyledLink to="/account/delete">Delete Account</StyledLink>
            </MenuContent>
          </StyledMenu>
        </>
      ) : (
        <StyledLink to="/signin">Sign In</StyledLink>
      )}
    </StyledDiv>
  );
};

export default Avatar;

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
`;
const StyledMenu = styled.div`
  display: inline-block;
  position: relative;
  &:hover div {
    display: block;
  }
`;
const StyledIcon = styled.div`
  font-size: 0.8em;
  width: 2em;
  height: 2em;
  line-height: 2em;
  text-align: center;
  border-radius: 50%;
  background: white;
  vertical-align: middle;
  margin-right: 1em;
  color: black;
`;
const MenuContent = styled.div`
  display: none;
  position: absolute;
  overflow: auto;
  z-index: 1;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.4);
  a {
    display: block;
    color: #000000;
    padding: 5px;
    text-decoration: none;
    padding: 20px 40px;
  }
`;
