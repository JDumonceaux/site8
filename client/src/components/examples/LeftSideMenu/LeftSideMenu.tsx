import './leftSideMenu.css';

import CustomNavLink from '../../ui/CustomNavLink';

export function LeftSideMenu() {
  return (
    <div className="left-side-menu">
      <nav aria-label="Home Navigation">
        <ul>
          <li>
            <CustomNavLink
              to="/"
              ariaLabel="Home">
              Home
            </CustomNavLink>
          </li>
        </ul>
      </nav>

      <nav
        role="navigation"
        aria-labelledby="reactmenu">
        <div id="reactmenu">React</div>
        <ul>
          <li>
            <CustomNavLink
              to="/react"
              ariaLabel="Learning React">
              Learning React
            </CustomNavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
