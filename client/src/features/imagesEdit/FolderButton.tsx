import React from 'react';

import styled from 'styled-components';
import type { ListItem } from '../../types/ListItem';

type Props = {
  readonly handleClick: (error: React.MouseEvent<HTMLButtonElement>) => void;
  readonly isActive: boolean;
  readonly item: ListItem;
};

const FolderButton = ({
  handleClick,
  isActive,
  item,
}: Props): React.JSX.Element =>
  isActive ? (
    <StyledActiveButton
      data-id={item.key}
      type="button"
      onClick={handleClick}
    >
      {item.value}
    </StyledActiveButton>
  ) : (
    <StyledButton
      data-id={item.key}
      type="button"
      onClick={handleClick}
    >
      {item.value}
    </StyledButton>
  );

FolderButton.displayName = 'FolderButton';

export default FolderButton;

const StyledButton = styled.button`
  display: block;
  width: 100%;
  padding: 5px 0;
  text-align: left;
  cursor: pointer;
  &:hover {
    background-color: #dcdcdc;
  }
`;
const StyledActiveButton = styled.button`
  display: block;
  width: 100%;
  padding: 5px 0;
  color: var(--navbar-dark-primary);
  background-color: var(--palette-samp);
  text-align: left;
`;
