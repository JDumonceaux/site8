import type { JSX } from 'react';

import Tooltip, { type TooltipBaseProps } from '../TooltipBase';

/** Renders an asterisk trigger tooltip for required fields */
const TooltipAsterix = ({ ...rest }: TooltipBaseProps): JSX.Element => {
  return (
    <Tooltip
      trigger="*"
      {...rest}
    />
  );
};
TooltipAsterix.displayName = 'TooltipAsterix';
export default TooltipAsterix;
