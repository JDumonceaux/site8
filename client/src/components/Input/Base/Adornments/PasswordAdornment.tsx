import { LockClosedIcon as Icon } from '@radix-ui/react-icons';
import type { JSX, SVGProps } from 'react';
import { forwardRef } from 'react';

export type PasswordAdornmentProps = Readonly<
  Omit<SVGProps<SVGSVGElement>, 'children' | 'data-testid' | 'ref'>
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
