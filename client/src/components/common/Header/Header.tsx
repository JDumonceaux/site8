import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { APP_NAME } from 'utils/constants';
import { MenuIcon } from './MenuIcon';
import Avatar from '../Avatar';

type HeaderProps = {
  readonly includeMenu?: boolean;
};

export const Header = ({ includeMenu = true }: HeaderProps): JSX.Element => {
  return (
    <StyledHeader data-testid="header">
      <div>
      <StyledSkipLink href="#main">Skip to main content</StyledSkipLink>
      {includeMenu ? <MenuIcon /> : null}
      <StyledLinkDiv>
        <Link to="/">
          <AppName>{APP_NAME}</AppName>
        </Link>
      </StyledLinkDiv>
      </div>
      <Avatar />
    </StyledHeader>
  );
};

export default Header;

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
