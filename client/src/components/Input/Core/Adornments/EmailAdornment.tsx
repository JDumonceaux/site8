import { memo, type FC, type SVGProps } from 'react';

import { EnvelopeClosedIcon as Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';

export type EmailAdornmentProps = Omit<SVGProps<SVGSVGElement>, 'ref'> &
  IconProps & {
    /** Testing identifier */
    'data-testid'?: string;
  };

export const EmailAdornment: FC<EmailAdornmentProps> = memo(
  ({
    'data-testid': dataTestId = 'email-icon',
    ...props
  }: EmailAdornmentProps) => <Icon {...props} data-testid={dataTestId} />,
);

EmailAdornment.displayName = 'EmailAdornment';
export default EmailAdornment;
