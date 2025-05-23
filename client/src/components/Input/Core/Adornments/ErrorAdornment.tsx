import { memo, type FC, type SVGProps } from 'react';

import { ExclamationTriangleIcon as Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';

export type ErrorAdornmentProps = IconProps &
  Omit<SVGProps<SVGSVGElement>, 'ref'> & {
    /** Custom test ID */
    'data-testid'?: string;
  };

/** Icon indicating an error state */
export const ErrorAdornment: FC<ErrorAdornmentProps> = memo(
  ({
    'data-testid': dataTestId = 'error-icon',
    ...props
  }: ErrorAdornmentProps) => <Icon {...props} data-testid={dataTestId} />,
);

ErrorAdornment.displayName = 'ErrorAdornment';
export default ErrorAdornment;
