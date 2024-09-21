import { memo } from 'react';

import { EnvelopeClosedIcon as Icon } from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';

type EmailAdornmentProps = {
  readonly ref?: React.Ref<HTMLDivElement>;
  readonly iconProps?: IconProps;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'data-testid'>;

const EmailAdornment = ({ ref, iconProps, ...rest }: EmailAdornmentProps) => (
  <div data-testid="Email icon" ref={ref} {...rest}>
    <Icon {...iconProps} />
  </div>
);

EmailAdornment.displayName = 'EmailAdornment';

export default memo(EmailAdornment);
