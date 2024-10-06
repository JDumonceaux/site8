import { memo } from 'react';
import Tooltip, { TooltipBaseProps } from '../TooltipBase';

type Props = TooltipBaseProps;

const TooltipAsterix = ({ ...rest }: Props): JSX.Element => {
  return <Tooltip trigger="*" {...rest} />;
};

TooltipAsterix.displayName = 'TooltipAsterix';

export default memo(TooltipAsterix);
