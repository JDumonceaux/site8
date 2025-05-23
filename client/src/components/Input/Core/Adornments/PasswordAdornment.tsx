import type { FC, Ref, SVGProps } from 'react';

import { LockClosedIcon as Icon } from '@radix-ui/react-icons';

export type PasswordAdornmentProps = Omit<
  SVGProps<SVGSVGElement>,
  'children' | 'data-testid'
> & {
  /** Ref forwarded to the SVG element */
  ref?: Ref<SVGSVGElement>;
};

/** A lock icon for password fields */
export const PasswordAdornment: FC<PasswordAdornmentProps> = ({
  ref,
  ...props
}: PasswordAdornmentProps) => (
  <Icon data-testid="Lock icon" ref={ref} {...props} />
);

PasswordAdornment.displayName = 'PasswordAdornment';
export default PasswordAdornment;
