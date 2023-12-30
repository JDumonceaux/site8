import { NavLink } from "react-router-dom";

const CustomNavLink = ({
  to,
  ariaLabel,
  children,
}: {
  to: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "active" : "")}
      aria-current="page"
      aria-label={ariaLabel ? ariaLabel : children?.toString()}
      data-testid="NavLink.root"
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
