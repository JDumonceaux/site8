import type { JSX, ReactNode, HTMLAttributes, MouseEventHandler } from 'react';

import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { Cross1Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';
import styled from 'styled-components';

import Tooltip from '../Tooltip/TooltipBase';

/**
 * Props for the clear/close adornment with tooltip.
 */
type ClearAdornmentProps = {
  /** Tooltip text for screen readers */
  ariaLabel?: string;
  /** Custom icon element */
  icon?: ReactNode;
  /** Props forwarded to the default icon */
  iconProps?: IconProps;
  /** Tooltip content */
  label?: string;
  /** Click handler */
  onClick: MouseEventHandler<HTMLButtonElement>;
} & HTMLAttributes<HTMLButtonElement>;

/**
 * A clickable clear/close adornment with tooltip.
 */
function ClearAdornment({
  ariaLabel = 'clear contents',
  className,
  icon,
  iconProps,
  label = 'Clear contents',
  onClick,
  style,
  ...rest
}: ClearAdornmentProps): JSX.Element {
  return (
    <Tooltip
      aria-label={ariaLabel}
      content={label}
      trigger={
        <TriggerButton
          className={className}
          onClick={onClick}
          style={style}
          {...rest}>
          <AccessibleIcon label={label}>
            {icon ?? <Cross1Icon {...iconProps} />}
          </AccessibleIcon>
        </TriggerButton>
      }
    />
  );
}

ClearAdornment.displayName = 'ClearAdornment';
export default ClearAdornment;

const TriggerButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text-primary-muted);
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: var(--hover-bg, rgba(0, 0, 255, 0.1));
    border-radius: 50%;
    outline: none;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;
