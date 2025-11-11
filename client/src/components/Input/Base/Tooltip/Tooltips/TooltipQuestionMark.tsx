import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import type { JSX } from 'react';

import Tooltip, { type TooltipBaseProps } from '../TooltipBase';

/** Renders a question-mark icon trigger tooltip */
const TooltipQuestionMark = ({ ...rest }: TooltipBaseProps): JSX.Element => {
  return (
    <Tooltip
      trigger={<QuestionMarkCircledIcon />}
      {...rest}
    />
  );
};

TooltipQuestionMark.displayName = 'TooltipQuestionMark';
export default TooltipQuestionMark;
