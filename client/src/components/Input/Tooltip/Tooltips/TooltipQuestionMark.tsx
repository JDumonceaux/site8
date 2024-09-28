import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { memo } from 'react';
import Tooltip, { TooltipBaseProps } from '../TooltipBase';

type Props = TooltipBaseProps;

const TooltipQuestionMark = ({ ...rest }: Props): JSX.Element => {
  return <Tooltip trigger={<QuestionMarkCircledIcon />} {...rest} />;
};

TooltipQuestionMark.displayName = 'TooltipQuestionMark';

export default memo(TooltipQuestionMark);
