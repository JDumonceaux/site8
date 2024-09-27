import React, { memo } from 'react';

import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { Cross1Icon as Icon } from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import { styled } from 'styled-components';
import Tooltip, { TooltipProps } from '../Tooltip/Tooltip';

type ClearAdornmentProps = {
  readonly ref?: React.Ref<HTMLButtonElement>;
  readonly label?: string;
  readonly iconProps?: IconProps;
  readonly icon?: React.ReactNode;
  readonly onClick: () => void;
  readonly ariaLabel?: string;
} & Omit<TooltipProps, 'content' | 'trigger'>;

const ClearAdornment = ({
  ref,
  label = 'Clear contents',
  ariaLabel = 'clear contents',
  iconProps,
  icon,
  onClick,
}: ClearAdornmentProps) => {
  return (
    <Tooltip
      content={label}
      trigger={
        <StyledTrigger onClick={onClick}>
          <AccessibleIcon label={label}>
            {icon ? icon : <Icon {...iconProps} />}
          </AccessibleIcon>
        </StyledTrigger>
      }
    />
  );
};

ClearAdornment.displayName = 'ClearAdornment';

export default memo(ClearAdornment);

const StyledTrigger = styled.div`
  margin: 0 8px;
  height: 24px;
  width: 24px;
  color: var(--text-primary-muted);
  :hover {
    background-color: blue;
    border-radius: 50%;
  }
  svg {
    margin: auto;
  }
`;
