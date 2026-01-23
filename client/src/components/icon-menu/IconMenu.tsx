import type { JSX, ReactNode } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import styled from 'styled-components';

/**
 * Props for the icon-triggered dropdown menu.
 */
type IconMenuProps = {
  /** Menu items to render inside the dropdown */
  children?: ReactNode;
};

/**
 * A trigger-only icon button that displays a dropdown menu.
 */
const IconMenu = ({ children }: IconMenuProps): JSX.Element => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <StyledButton
          aria-haspopup="menu"
          aria-label="Customize options"
          type="button"
        >
          <DotsVerticalIcon />
        </StyledButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <StyledMenuContent
          align="start"
          side="right"
          sideOffset={5}
        >
          {children}
        </StyledMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

IconMenu.displayName = 'IconMenu';
export default IconMenu;

const StyledButton = styled.button`
  font-family: inherit;
  border-radius: var(--border-radius-circle);
  width: 35px;
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--palette-main-color);
  background-color: var(--color-white);
  box-shadow: 0 2px 10px var(--black-a7);
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--focus-ring-color, #2684ff);
    outline-offset: 2px;
  }
`;

const StyledMenuContent = styled(DropdownMenu.Content)`
  min-width: 220px;
  background-color: var(--palette-grey-10);
  border: 1px solid var(--palette-samp);
  border-radius: var(--border-radius-md);
  padding: 0.5rem;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  z-index: 20;
`;
