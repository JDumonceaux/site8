import type { JSX } from 'react';
import styled from 'styled-components';

/**
 * Sidebar menu component following SOLID principles.
 */
type MenuProps = {
  /** Elements to render inside the menu */
  children: React.ReactNode;
};

export const Menu = ({ children }: MenuProps): JSX.Element => (
  <MenuContainer data-testid="menu">{children}</MenuContainer>
);

Menu.displayName = 'Menu';

// Styled component defining menu layout and width
const MenuContainer = styled.div`
  flex: 0 0 250px;
  display: flex;
  flex-direction: column;
`;
