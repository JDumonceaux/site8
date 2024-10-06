import React, { memo } from 'react';

import { EnvelopeClosedIcon as Icon } from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';

type EmailAdornmentProps = {
  readonly children?: never;
  readonly iconProps?: IconProps;
  readonly ref?: React.Ref<SVGSVGElement>;
} & Omit<React.HTMLAttributes<HTMLOrSVGElement>, 'data-testid'>;

const EmailAdornment = ({ iconProps, ref, ...rest }: EmailAdornmentProps) => (
  <Icon {...iconProps} data-testid="Email icon" ref={ref} {...rest} />
);

EmailAdornment.displayName = 'EmailAdornment';

export default memo(EmailAdornment);
