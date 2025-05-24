import { memo, type JSX, type SVGProps } from 'react';

import { EnvelopeClosedIcon as Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';

/**
 * Props for the email SVG adornment.
 */
type EmailAdornmentProps = Omit<SVGProps<SVGSVGElement>, 'ref'> &
  IconProps & {
    /** Testing identifier */
    'data-testid'?: string;
  };

/**
 * An email icon adornment component.
 */
function EmailAdornment({
  'data-testid': dataTestId = 'email-icon',
  ...props
}: EmailAdornmentProps): JSX.Element {
  return <Icon {...props} data-testid={dataTestId} />;
}

EmailAdornment.displayName = 'EmailAdornment';
export default memo(EmailAdornment);
