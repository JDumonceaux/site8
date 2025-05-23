import type { FC } from 'react';

import Tooltip, { type TooltipBaseProps } from '../TooltipBase';

export type TooltipAsterixProps = TooltipBaseProps;

/** Renders an asterisk trigger tooltip for required fields */
export const TooltipAsterix: FC<TooltipAsterixProps> = (props) => (
  <Tooltip trigger="*" {...props} />
);

TooltipAsterix.displayName = 'TooltipAsterix';
export default TooltipAsterix;
