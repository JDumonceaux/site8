import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';
import * as Toggle from '@radix-ui/react-toggle';
import type { ToggleProps } from '@radix-ui/react-toggle';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

type Props = {
  readonly hideLabel?: string;
  readonly iconProps?: IconProps;
  readonly ref?: React.Ref<HTMLButtonElement>;
  readonly showLabel?: string;
} & ToggleProps;

const ShowAdornment = ({
  hideLabel = 'Hide password',
  iconProps,
  ref,
  showLabel = 'Show password',
  ...rest
}: Props) => {
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

export default ShowAdornment;
