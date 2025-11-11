import { EnvelopeClosedIcon as Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';
import type { JSX, SVGProps } from 'react';

type EmailAdornmentProps = Readonly<
  Omit<SVGProps<SVGSVGElement>, 'data-testid' | 'ref'> & IconProps
>;

const EmailAdornment = (props: EmailAdornmentProps): JSX.Element => (
  <Icon
    {...props}
    data-testid="email-icon"
  />
);

EmailAdornment.displayName = 'EmailAdornment';
export default EmailAdornment;
