import type { JSX, ReactNode } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled from 'styled-components';

export type IconMenuItemProps = DropdownMenu.DropdownMenuItemProps & {
  /** Item label or content */
  children?: ReactNode;
};

const IconMenuItem = ({
  children,
  ...rest
}: IconMenuItemProps): JSX.Element => {
  return <StyledMenuItem {...rest}>{children}</StyledMenuItem>;
};

IconMenuItem.displayName = 'IconMenuItem';
export default IconMenuItem;

const StyledMenuItem = styled(DropdownMenu.Item)`
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px 0 25px;
  font-size: 13px;
  line-height: 1;
  color: var(--palette-main-color);
  border-radius: 3px;
  position: relative;
  user-select: none;
  outline: none;

  &[data-highlighted] {
    background-color: var(--palette-grey-20);
  }
`;
