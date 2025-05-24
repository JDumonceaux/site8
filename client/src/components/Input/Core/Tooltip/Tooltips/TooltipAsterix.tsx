import type { JSX } from 'react';

import Tooltip, { type TooltipBaseProps } from '../TooltipBase';

/** Renders an asterisk trigger tooltip for required fields */
function TooltipAsterix(props: TooltipBaseProps): JSX.Element {
  return <Tooltip trigger="*" {...props} />;
}
TooltipAsterix.displayName = 'TooltipAsterix';
export default TooltipAsterix;
