import type { JSX } from 'react';

import TooltipBase, { type TooltipBaseProps } from './TooltipBase';
import TooltipAsterix from './Tooltips/TooltipAsterix';
import TooltipQuestionMark from './Tooltips/TooltipQuestionMark';

export type TooltipProps = TooltipBaseProps;

type TooltipComponent = {
  (props: TooltipProps): JSX.Element;
  Asterix: typeof TooltipAsterix;
  QuestionMark: typeof TooltipQuestionMark;
  displayName?: string;
};

const Tooltip: TooltipComponent = function Tooltip(props) {
  return <TooltipBase {...props} />;
} as TooltipComponent;

Tooltip.Asterix = TooltipAsterix;
Tooltip.QuestionMark = TooltipQuestionMark;
Tooltip.displayName = 'Tooltip';

export default Tooltip;
