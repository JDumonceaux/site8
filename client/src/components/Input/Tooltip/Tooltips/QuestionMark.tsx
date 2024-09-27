import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { memo } from 'react';

type QuestionMarkProps = {};

const QuestionMark = ({}: QuestionMarkProps): JSX.Element => {
  return <QuestionMarkCircledIcon />;
};

QuestionMark.displayName = 'QuestionMark';

export default memo(QuestionMark);
