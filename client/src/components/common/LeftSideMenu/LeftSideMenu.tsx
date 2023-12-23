import { NavLink } from "react-router-dom";

import "./leftSideMenu.css";

export default function LeftSideMenu() {
  const CustomNavLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? "active" : "")}
        aria-current="page"
      >
        {children}
      </NavLink>
    );
  };

  return (
    <nav>
      <ul>
        <li>
          <CustomNavLink to="/">Home</CustomNavLink>
        </li>
        <li>
          React
          <ul>
            <li>
              <CustomNavLink to="/react">Learning React</CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/react/vss">Visual Studio Code</CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/react/git">GIT - Installing</CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/react/html">HTML</CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/react/css">CSS</CustomNavLink>
            </li>
          </ul>
        </li>
        <li>
          <CustomNavLink to="/art">Art</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/books">Books</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/music">Music</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/photography">Photography</CustomNavLink>
        </li>
      </ul>
    </nav>
  );
}
