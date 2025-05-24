import { memo, type JSX, type SVGProps } from 'react';

import { ExclamationTriangleIcon as Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';

/**
 * Props for the error state SVG adornment.
 */
type ErrorAdornmentProps = IconProps &
  Omit<SVGProps<SVGSVGElement>, 'ref'> & {
    /** Custom test ID */
    'data-testid'?: string;
  };

/**
 * Icon indicating an error state.
 */
function ErrorAdornment({
  'data-testid': dataTestId = 'error-icon',
  ...props
}: ErrorAdornmentProps): JSX.Element {
  return <Icon {...props} data-testid={dataTestId} />;
}

ErrorAdornment.displayName = 'ErrorAdornment';
export default memo(ErrorAdornment);
