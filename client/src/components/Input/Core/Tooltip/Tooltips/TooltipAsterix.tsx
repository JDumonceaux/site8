import { memo } from 'react';

import Tooltip, { type TooltipBaseProps } from '../TooltipBase';

type Props = TooltipBaseProps;

const TooltipAsterix = ({ ...rest }: Props): React.JSX.Element => (
  <Tooltip trigger="*" {...rest} />
);

TooltipAsterix.displayName = 'TooltipAsterix';

export default memo(TooltipAsterix);
