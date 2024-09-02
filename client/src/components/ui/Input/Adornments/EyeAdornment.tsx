import { memo } from 'react';

import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import * as Toggle from '@radix-ui/react-toggle';
import { ToggleProps } from '@radix-ui/react-toggle';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

type EyeAdornmentProps = {
  readonly hideLabel?: string;
  readonly showLabel?: string;
  readonly ref?: React.Ref<HTMLButtonElement>;
} & ToggleProps;

const EyeAdornment = ({
  hideLabel = 'Hide password',
  showLabel = 'Show password',
  ref,
  ...rest
}: EyeAdornmentProps) => {
  const show = rest.pressed ?? false;

  return (
    <Toggle.Root {...rest} ref={ref}>
      {show ? (
        <AccessibleIcon label={showLabel}>
          <EyeOpenIcon aria-hidden="true" />
        </AccessibleIcon>
      ) : (
        <AccessibleIcon label={hideLabel}>
          <EyeNoneIcon aria-hidden="true" />
        </AccessibleIcon>
      )}
      <VisuallyHidden>{show ? showLabel : hideLabel}</VisuallyHidden>
    </Toggle.Root>
  );
};

EyeAdornment.displayName = 'EyeAdornment';

export default memo(EyeAdornment);
export type { EyeAdornmentProps };
