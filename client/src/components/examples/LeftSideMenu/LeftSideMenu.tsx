import './leftSideMenu.css';

import StyledNavLink from '../../common/StyledNavLink/StyledNavLink';

export const LeftSideMenu = (): JSX.Element => {
  return (
    <>
      <nav aria-label="Home Navigation">
        <ul>
          <li>
            <StyledNavLink ariaLabel="Home" to="/">
              Home
            </StyledNavLink>
          </li>
        </ul>
      </nav>

      <nav aria-labelledby="reactmenu" role="navigation">
        <div id="reactmenu">React</div>
        <ul>
          <li>
            <StyledNavLink ariaLabel="Learning React" to="/react">
              Learning React
            </StyledNavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
