import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomNavLink = ({
  to,
  ariaLabel,
  children,
}: {
  readonly to: string;
  readonly ariaLabel?: string;
  readonly children: React.ReactNode;
}): JSX.Element => {
  return (
    <NavLink
      aria-current="page"
      aria-label={ariaLabel ? ariaLabel : children?.toString()}
      className={({ isActive }) => (isActive ? 'active' : '')}
      to={to}>
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
