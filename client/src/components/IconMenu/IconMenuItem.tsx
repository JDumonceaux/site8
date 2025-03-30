import React from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled from 'styled-components';

type Props = {
  readonly children?: React.ReactNode;
} & DropdownMenu.DropdownMenuItemProps;

const IconMenuItem = React.memo(
  ({ children, ...rest }: Props): React.JSX.Element => {
    return <StyledMenuItem {...rest}>{children}</StyledMenuItem>;
  },
);

IconMenuItem.displayName = 'IconMenuItem';

export default IconMenuItem;

const StyledMenuItem = styled(DropdownMenu.Item)`
  font-size: 13px;
  line-height: 1;
  color: var(--violet-11);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  user-select: none;
  outline: none;
`;
