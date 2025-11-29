import type { JSX } from 'react';

import TooltipBase, { type TooltipBaseProps } from './TooltipBase';
import TooltipAsterix from './tooltips/TooltipAsterix';
import TooltipQuestionMark from './tooltips/TooltipQuestionMark';

export type TooltipProps = TooltipBaseProps;

const Tooltip = ({ ...rest }: TooltipProps): JSX.Element => {
  return <TooltipBase {...rest} />;
};

Tooltip.Asterix = TooltipAsterix;
Tooltip.QuestionMark = TooltipQuestionMark;
Tooltip.displayName = 'Tooltip';

export default Tooltip;
