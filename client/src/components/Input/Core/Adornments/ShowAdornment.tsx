import { memo } from 'react';

import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import * as Toggle from '@radix-ui/react-toggle';
import { ToggleProps } from '@radix-ui/react-toggle';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

type ShowAdornmentProps = {
  readonly hideLabel?: string;
  readonly showLabel?: string;
  readonly ref?: React.Ref<HTMLButtonElement>;
  readonly iconProps?: IconProps;
} & ToggleProps;

const ShowAdornment = ({
  hideLabel = 'Hide password',
  showLabel = 'Show password',
  ref,
  iconProps,
  ...rest
}: ShowAdornmentProps) => {
  const show = rest.pressed ?? false;

  return (
    <Toggle.Root {...rest} ref={ref}>
      {show ? (
        <AccessibleIcon label={showLabel}>
          <EyeOpenIcon {...iconProps} aria-hidden="true" />
        </AccessibleIcon>
      ) : (
        <AccessibleIcon label={hideLabel}>
          <EyeNoneIcon {...iconProps} aria-hidden="true" />
        </AccessibleIcon>
      )}
      <VisuallyHidden>{show ? showLabel : hideLabel}</VisuallyHidden>
    </Toggle.Root>
  );
};

ShowAdornment.displayName = 'ShowAdornment';

export default memo(ShowAdornment);
