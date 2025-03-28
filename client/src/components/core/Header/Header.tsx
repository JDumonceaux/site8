import { memo } from 'react';

import { MenuIcon } from 'components/icons/MenuIcon';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import { APP_NAME } from 'lib/utils/constants';
import { styled } from 'styled-components';

type HeaderProps = {
  readonly avatar?: React.ReactNode;
  readonly includeMenu?: boolean;
};

const Header = ({
  avatar,
  includeMenu = false,
}: HeaderProps): React.JSX.Element => {
  return (
    <StyledHeader data-testid="header">
      <div>
        <StyledSkipLink href="#main">Skip to main content</StyledSkipLink>
        {includeMenu ? <MenuIcon /> : null}
        <StyledLinkDiv>
          <StyledLink to="/">
            <AppName>{APP_NAME}</AppName>
          </StyledLink>
        </StyledLinkDiv>
      </div>
      <div>{avatar}</div>
    </StyledHeader>
  );
};

Header.displayName = 'Header';

export default memo(Header);

const StyledHeader = styled.header`
  background-color: var(--palette-main-color, #000);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  width: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  box-shadow: 0 5px 20px -10px #000;
  margin-bottom: 2px;
`;
const StyledSkipLink = styled.a`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  &:focus {
    position: static;
    width: auto;
    height: auto;
  }
`;
const AppName = styled.div`
  color: var(--palette-grey-10, #fff);
  font-size: 1.1rem;
`;
const StyledLinkDiv = styled.div`
  a:hover {
    text-decoration-color: #5f1a2a;
  }
  a {
    display: block;
  }
  div {
    padding: 3px 16px;
  }
`;
