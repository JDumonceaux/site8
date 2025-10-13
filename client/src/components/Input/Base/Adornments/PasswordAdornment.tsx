import type { JSX, SVGProps } from 'react';
import { forwardRef } from 'react';

import { LockClosedIcon as Icon } from '@radix-ui/react-icons';

export type PasswordAdornmentProps = Readonly<
  Omit<SVGProps<SVGSVGElement>, 'ref' | 'children' | 'data-testid'>
>;

const PasswordAdornment = forwardRef<SVGSVGElement, PasswordAdornmentProps>(
  (props, ref): JSX.Element => (
    <Icon
      ref={ref}
      data-testid="password-icon"
      {...props}
    />
  ),
);

PasswordAdornment.displayName = 'PasswordAdornment';
export default PasswordAdornment;
