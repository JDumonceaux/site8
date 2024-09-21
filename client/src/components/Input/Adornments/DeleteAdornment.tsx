import { memo } from 'react';

import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { Cross1Icon as Icon } from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import { styled } from 'styled-components';
import Tooltip, { TooltipProps } from '../Tooltip/Tooltip';

type DeleteAdornmentProps = {
  readonly ref?: React.Ref<HTMLButtonElement>;
  readonly label?: string;
  readonly iconProps?: IconProps;
} & Omit<TooltipProps, 'content' | 'trigger'>;

const DeleteAdornment = ({
  ref,
  label = 'Clear contents',
  iconProps,
  ...rest
}: DeleteAdornmentProps) => {
  return (
    <Tooltip
      content="Clear contents"
      trigger={
        <StyledTrigger>
          <AccessibleIcon label={label}>
            <Icon {...iconProps} />
          </AccessibleIcon>
        </StyledTrigger>
      }
    />
  );
};

DeleteAdornment.displayName = 'DeleteAdornment';

export default memo(DeleteAdornment);

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
