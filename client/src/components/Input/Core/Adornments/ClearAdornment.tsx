import type { FC } from 'react';

import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { Cross1Icon as Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';
import styled from 'styled-components';

import Tooltip from '../Tooltip/TooltipBase';

export type ClearAdornmentProps = {
  readonly ariaLabel?: string;
  readonly icon?: React.ReactNode;
  readonly iconProps?: IconProps;
  readonly label?: string;
  readonly onClick: () => void;
  readonly ref?: React.Ref<SVGSVGElement>;
};

const ClearAdornment: FC<ClearAdornmentProps> = ({
  ariaLabel = 'clear contents',
  icon,
  iconProps,
  label = 'Clear contents',
  onClick,
  ref,
  ...rest
}: ClearAdornmentProps): React.JSX.Element => (
  <Tooltip
    aria-label={ariaLabel}
    content={label}
    {...rest}
    trigger={
      <StyledTrigger onClick={onClick}>
        <AccessibleIcon label={label}>
          {icon ?? <Icon {...iconProps} ref={ref} />}
        </AccessibleIcon>
      </StyledTrigger>
    }
  />
);

ClearAdornment.displayName = 'ClearAdornment';

export default ClearAdornment;

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
