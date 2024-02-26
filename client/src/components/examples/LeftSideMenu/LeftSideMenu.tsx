import './leftSideMenu.css';

import CustomNavLink from '../../ui/CustomNavLink';

export const LeftSideMenu = (): JSX.Element => {
  return (
    <div className="left-side-menu">
      <nav aria-label="Home Navigation">
        <ul>
          <li>
            <CustomNavLink ariaLabel="Home" to="/">
              Home
            </CustomNavLink>
          </li>
        </ul>
      </nav>

      <nav aria-labelledby="reactmenu" role="navigation">
        <div id="reactmenu">React</div>
        <ul>
          <li>
            <CustomNavLink ariaLabel="Learning React" to="/react">
              Learning React
            </CustomNavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
