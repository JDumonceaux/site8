import type { JSX, Ref } from 'react';

import { LockClosedIcon as Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';

export type PasswordAdornmentProps = Readonly<
  Omit<IconProps, 'children' | 'data-testid'> & {
    ref?: Ref<SVGSVGElement>;
  }
>;

const PasswordAdornment = ({
  ref,
  ...props
}: PasswordAdornmentProps): JSX.Element => {
  return (
    <Icon
      data-testid="password-icon"
      ref={ref}
      {...props}
    />
  );
};

PasswordAdornment.displayName = 'PasswordAdornment';
export default PasswordAdornment;
