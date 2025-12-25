import type { JSX, Ref, SVGProps } from 'react';

import { LockClosedIcon as Icon } from '@radix-ui/react-icons';

export type PasswordAdornmentProps = Readonly<
  Omit<SVGProps<SVGSVGElement>, 'children' | 'data-testid' | 'ref'> & {
    ref?: Ref<SVGSVGElement>;
  }
>;

const PasswordAdornment = ({
  ref,
  ...props
}: PasswordAdornmentProps): JSX.Element => (
  <Icon
    ref={ref}
    data-testid="password-icon"
    {...props}
  />
);

PasswordAdornment.displayName = 'PasswordAdornment';
export default PasswordAdornment;
