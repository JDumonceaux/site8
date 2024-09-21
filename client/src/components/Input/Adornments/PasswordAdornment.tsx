import { memo } from 'react';

import { LockClosedIcon as Icon } from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';

type PasswordAdornmentProps = {
  readonly ref?: React.Ref<HTMLDivElement>;
  readonly iconProps?: IconProps;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'data-testid'>;

const PasswordAdornment = ({
  ref,
  iconProps,
  ...rest
}: PasswordAdornmentProps) => (
  <div data-testid="Lock icon" ref={ref} {...rest}>
    <Icon {...iconProps} />
  </div>
);

PasswordAdornment.displayName = 'PasswordAdornment';

export default memo(PasswordAdornment);
