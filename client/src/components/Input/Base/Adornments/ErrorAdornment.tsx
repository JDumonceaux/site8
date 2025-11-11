import { ExclamationTriangleIcon as Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';
import type { JSX, SVGProps } from 'react';

type ErrorAdornmentProps = Readonly<
  IconProps & Omit<SVGProps<SVGSVGElement>, 'data-testid' | 'ref'>
>;

const ErrorAdornment = (props: ErrorAdornmentProps): JSX.Element => (
  <Icon
    {...props}
    data-testid="error-icon"
  />
);

ErrorAdornment.displayName = 'ErrorAdornment';
export default ErrorAdornment;
