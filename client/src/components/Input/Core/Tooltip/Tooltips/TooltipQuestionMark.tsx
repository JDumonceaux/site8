import type { FC } from 'react';

import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

import Tooltip, { type TooltipBaseProps } from '../TooltipBase';

export type TooltipQuestionMarkProps = TooltipBaseProps;

/** Renders a question-mark icon trigger tooltip */
export const TooltipQuestionMark: FC<TooltipQuestionMarkProps> = (props) => (
  <Tooltip trigger={<QuestionMarkCircledIcon />} {...props} />
);

TooltipQuestionMark.displayName = 'TooltipQuestionMark';
export default TooltipQuestionMark;
