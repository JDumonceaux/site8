import React, { memo } from 'react';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import Tooltip, { TooltipBaseProps } from '../TooltipBase';

type Props = TooltipBaseProps;

const TooltipQuestionMark = ({ ...rest }: Props): React.JSX.Element => <Tooltip trigger={<QuestionMarkCircledIcon />} {...rest} />;

TooltipQuestionMark.displayName = 'TooltipQuestionMark';

export default memo(TooltipQuestionMark);
