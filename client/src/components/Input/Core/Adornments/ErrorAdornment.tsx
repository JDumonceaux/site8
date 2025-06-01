import type { JSX, SVGProps } from 'react';

import { ExclamationTriangleIcon as Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';

type ErrorAdornmentProps = IconProps &
  Omit<SVGProps<SVGSVGElement>, 'ref' | 'data-testid'>;

const ErrorAdornment = ({ ...rest }: ErrorAdornmentProps): JSX.Element => {
  return <Icon {...rest} data-testid="error-icon" />;
};

ErrorAdornment.displayName = 'ErrorAdornment';
export default ErrorAdornment;
