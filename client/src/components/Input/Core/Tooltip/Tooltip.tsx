import React from 'react';

import TooltipBase, { type TooltipBaseProps } from './TooltipBase';
import TooltipAsterix from './Tooltips/TooltipAsterix';
import TooltipQuestionMark from './Tooltips/TooltipQuestionMark';

type Props = TooltipBaseProps;

const Tooltip = ({ ...rest }: Props): React.JSX.Element => (
  <TooltipBase {...rest} />
);

Tooltip.Asterix = TooltipAsterix;
Tooltip.QuestionMark = TooltipQuestionMark;

export default Tooltip;
