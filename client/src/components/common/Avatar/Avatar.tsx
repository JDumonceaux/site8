'use client';

import { StyledLink } from 'components/ui/Form/StyledLink';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from 'services/hooks/useAuth';
import { styled } from 'styled-components';

export const Avatar = (): JSX.Element => {
  const { authFetchUserAttributes, initial } = useAuth();

  useEffect(() => {
    authFetchUserAttributes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledDiv data-testid="avatar">
      {initial ? <StyledIcon>{initial}</StyledIcon> : null}
      <StyledMenu>
        <StyledLink to="/signin">Sign In</StyledLink>
        <MenuContent>
          <Link to="/password/change">Change Password</Link>
          <Link to="/signout">Sign Out</Link>
        </MenuContent>
      </StyledMenu>
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
