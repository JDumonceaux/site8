import { memo } from 'react';

import { EnvelopeClosedIcon as Icon } from '@radix-ui/react-icons';

type EmailAdornmentProps = {
  readonly ref?: React.Ref<HTMLDivElement>;
};

const EmailAdornment = ({ ref, ...rest }: EmailAdornmentProps) => (
  <div data-testid="Email icon" ref={ref} {...rest}>
    <Icon />
  </div>
);

EmailAdornment.displayName = 'EmailAdornment';

export default memo(EmailAdornment);
