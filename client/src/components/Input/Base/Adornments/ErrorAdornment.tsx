import type { JSX, SVGProps } from 'react';

import { ExclamationTriangleIcon as Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';

type ErrorAdornmentProps = Readonly<
  IconProps & Omit<SVGProps<SVGSVGElement>, 'ref' | 'data-testid'>
>;

const ErrorAdornment = (props: ErrorAdornmentProps): JSX.Element => (
  <Icon
    {...props}
    data-testid="error-icon"
  />
);

ErrorAdornment.displayName = 'ErrorAdornment';
export default ErrorAdornment;
