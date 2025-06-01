import type { JSX, SVGProps } from 'react';

import { EnvelopeClosedIcon as Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';

type EmailAdornmentProps = Omit<
  SVGProps<SVGSVGElement>,
  'ref' | 'data-testid'
> &
  IconProps;

const EmailAdornment = ({ ...rest }: EmailAdornmentProps): JSX.Element => {
  return <Icon {...rest} data-testid="email-icon" />;
};

EmailAdornment.displayName = 'EmailAdornment';
export default EmailAdornment;
