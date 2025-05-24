import type { JSX, Ref, SVGProps } from 'react';

import { LockClosedIcon as Icon } from '@radix-ui/react-icons';

/**
 * Props for the password field adornment icon.
 */
export type PasswordAdornmentProps = Omit<
  SVGProps<SVGSVGElement>,
  'children' | 'data-testid'
> & {
  /** Ref forwarded to the SVG element */
  ref?: Ref<SVGSVGElement>;
};

/** A lock icon for password fields */
function PasswordAdornment({
  ref,
  ...props
}: PasswordAdornmentProps): JSX.Element {
  return <Icon data-testid="Lock icon" ref={ref} {...props} />;
}

PasswordAdornment.displayName = 'PasswordAdornment';
export default PasswordAdornment;
