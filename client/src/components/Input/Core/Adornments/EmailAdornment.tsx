import { memo, type FC } from 'react';

import { EnvelopeClosedIcon as Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';

type EmailAdornmentProp = {
  readonly children?: never;
  readonly iconProps?: IconProps;
  readonly ref?: React.Ref<SVGSVGElement>;
} & Omit<React.HTMLAttributes<HTMLOrSVGElement>, 'data-testid'>;

const EmailAdornment: FC<EmailAdornmentProp> = memo(
  ({ iconProps, ref, ...rest }: EmailAdornmentProp): React.JSX.Element => (
    <Icon {...iconProps} data-testid="Email icon" ref={ref} {...rest} />
  ),
);

EmailAdornment.displayName = 'EmailAdornment';

export default EmailAdornment;
