import type { FC } from 'react';

import TooltipBase, { type TooltipBaseProps } from './TooltipBase';
import TooltipAsterix from './Tooltips/TooltipAsterix';
import TooltipQuestionMark from './Tooltips/TooltipQuestionMark';

export type TooltipProps = TooltipBaseProps;

export const Tooltip: FC<TooltipProps> & {
  Asterix: typeof TooltipAsterix;
  QuestionMark: typeof TooltipQuestionMark;
} = (props) => <TooltipBase {...props} />;

Tooltip.Asterix = TooltipAsterix;
Tooltip.QuestionMark = TooltipQuestionMark;
Tooltip.displayName = 'Tooltip';

export default Tooltip;
