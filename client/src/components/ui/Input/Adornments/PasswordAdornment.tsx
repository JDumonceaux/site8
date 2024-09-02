import { memo } from 'react';

import { LockClosedIcon as Icon } from '@radix-ui/react-icons';

type PasswordAdornmentProps = {
  readonly ref?: React.Ref<HTMLDivElement>;
};

const PasswordAdornment = ({ ref, ...rest }: PasswordAdornmentProps) => (
  <div data-testid="Lock icon" ref={ref} {...rest}>
    <Icon />
  </div>
);

PasswordAdornment.displayName = 'PasswordAdornment';

export default memo(PasswordAdornment);
export type { PasswordAdornmentProps };
