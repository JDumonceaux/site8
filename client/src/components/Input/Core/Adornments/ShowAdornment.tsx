import type { JSX, Ref } from 'react';

import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';
import * as Toggle from '@radix-ui/react-toggle';
import type { ToggleProps } from '@radix-ui/react-toggle';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

/**
 * Props for toggling password visibility with accessible icons.
 */
type ShowAdornmentProps = ToggleProps & {
  /** Tooltip text when password is visible */
  hideLabel?: string;
  /** Tooltip text when password is hidden */
  showLabel?: string;
  /** Props forwarded to the icon */
  iconProps?: IconProps;
  /** Ref forwarded to the toggle button */
  ref?: Ref<HTMLButtonElement>;
};

/**
 * Toggles password visibility with accessible icons and labels.
 */
function ShowAdornment({
  hideLabel = 'Hide password',
  showLabel = 'Show password',
  pressed = false,
  iconProps,
  ref,
  ...rest
}: ShowAdornmentProps): JSX.Element {
  const label = pressed ? hideLabel : showLabel;

  return (
    <Toggle.Root {...rest} aria-label={label} pressed={pressed} ref={ref}>
      <AccessibleIcon label={label}>
        {pressed ? (
          <EyeOpenIcon {...iconProps} aria-hidden="true" />
        ) : (
          <EyeNoneIcon {...iconProps} aria-hidden="true" />
        )}
      </AccessibleIcon>
      <VisuallyHidden>{label}</VisuallyHidden>
    </Toggle.Root>
  );
}

ShowAdornment.displayName = 'ShowAdornment';
export default ShowAdornment;
