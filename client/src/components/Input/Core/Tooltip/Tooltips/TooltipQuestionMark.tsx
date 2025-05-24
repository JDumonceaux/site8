import type { JSX } from 'react';

import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

import Tooltip, { type TooltipBaseProps } from '../TooltipBase';

/** Renders a question-mark icon trigger tooltip */
function TooltipQuestionMark(props: TooltipBaseProps): JSX.Element {
  return <Tooltip trigger={<QuestionMarkCircledIcon />} {...props} />;
}

TooltipQuestionMark.displayName = 'TooltipQuestionMark';
export default TooltipQuestionMark;
