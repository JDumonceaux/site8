import TooltipBase, { TooltipBaseProps } from './TooltipBase';
import TooltipAsterix from './Tooltips/TooltipAsterix';
import TooltipQuestionMark from './Tooltips/TooltipQuestionMark';

type Props = TooltipBaseProps;

const Tooltip = ({ ...rest }: Props): JSX.Element => {
  return <TooltipBase {...rest} />;
};

Tooltip.Asterix = TooltipAsterix;
Tooltip.QuestionMark = TooltipQuestionMark;

export default Tooltip;
