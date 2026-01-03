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
}: PasswordAdornmentProps): JSX.Element => {
  // Filter out undefined values to comply with exactOptionalPropertyTypes
  const filteredProps = Object.fromEntries(
    Object.entries(props).filter(([_, value]) => value !== undefined),
  ) as SVGProps<SVGSVGElement>;

  return (
    <Icon
      data-testid="password-icon"
      ref={ref}
      {...filteredProps}
    />
  );
};

PasswordAdornment.displayName = 'PasswordAdornment';
export default PasswordAdornment;
