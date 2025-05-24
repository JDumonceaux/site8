import { memo, type JSX, type ReactNode } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled from 'styled-components';

export type IconMenuItemProps = DropdownMenu.DropdownMenuItemProps & {
  /** Item label or content */
  children?: ReactNode;
};

/** A styled dropdown menu item with built-in padding and alignment */
function IconMenuItem({ children, ...props }: IconMenuItemProps): JSX.Element {
  return <StyledMenuItem {...props}>{children}</StyledMenuItem>;
}
IconMenuItem.displayName = 'IconMenuItem';
export default memo(IconMenuItem);

const StyledMenuItem = styled(DropdownMenu.Item)`
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px 0 25px;
  font-size: 13px;
  line-height: 1;
  color: var(--violet-11);
  border-radius: 3px;
  position: relative;
  user-select: none;
  outline: none;

  &[data-highlighted] {
    background-color: var(--palette-grey-20);
  }
`;
