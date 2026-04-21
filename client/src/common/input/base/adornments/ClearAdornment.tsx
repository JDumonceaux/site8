import type {
  HTMLAttributes,
  JSX,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react';

import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { Cross1Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';
import Tooltip from '../tooltip/TooltipBase';
import styled from 'styled-components';

type ClearAdornmentProps = {
  /** Tooltip text for screen readers */
  readonly ariaLabel?: string;
  /** Custom icon element */
  readonly icon?: ReactNode;
  /** Props forwarded to the default icon */
  readonly iconProps?: IconProps;
  /** Tooltip content */
  readonly label?: string;
  /** Click handler */
  readonly onClick: MouseEventHandler<HTMLButtonElement>;
  /** Ref to the button element */
  readonly ref?: Ref<HTMLButtonElement>;
} & Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'>;

const ClearAdornment = ({
  ariaLabel = 'clear contents',
  icon,
  iconProps,
  label = 'Clear contents',
  onClick,
  ref,
  ...rest
}: ClearAdornmentProps): JSX.Element => (
  <Tooltip
    aria-label={ariaLabel}
    content={label}
    trigger={
      <TriggerButton
        onClick={onClick}
        ref={ref}
        type="button"
        {...rest}
      >
        <AccessibleIcon label={label}>
          {icon ?? <Cross1Icon {...iconProps} />}
        </AccessibleIcon>
      </TriggerButton>
    }
  />
);

ClearAdornment.displayName = 'ClearAdornment';
export default ClearAdornment;

const TriggerButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: var(--border-radius-circle);
  color: var(--input-icon-color);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover,
  &:focus-visible {
    background-color: var(--hover-background);
    color: var(--text-primary-color);
    outline: none;
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 1px var(--status-info);
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;
