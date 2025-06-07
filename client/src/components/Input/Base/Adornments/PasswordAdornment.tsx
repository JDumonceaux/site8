import type { JSX, Ref, SVGProps } from 'react';

import { LockClosedIcon as Icon } from '@radix-ui/react-icons';

export type PasswordAdornmentProps = Omit<
  SVGProps<SVGSVGElement>,
  'children' | 'data-testid'
> & {
  /** Ref forwarded to the SVG element */
  ref?: Ref<SVGSVGElement>;
};

const PasswordAdornment = ({
  ref,
  ...rest
}: PasswordAdornmentProps): JSX.Element => {
  return <Icon data-testid="Lock icon" ref={ref} {...rest} />;
};

PasswordAdornment.displayName = 'PasswordAdornment';
export default PasswordAdornment;
