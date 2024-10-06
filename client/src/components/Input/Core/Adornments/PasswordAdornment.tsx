import React, { memo } from 'react';

import { LockClosedIcon as Icon } from '@radix-ui/react-icons';


type Props = {
  readonly children?: never;
  readonly ref?: React.Ref<SVGSVGElement>;
} & Omit<React.HTMLAttributes<HTMLOrSVGElement>, 'data-testid'>;

const PasswordAdornment = ({
  ref,
  ...rest
}: Props) => (
  <Icon data-testid="Lock icon" ref={ref} {...rest} />
);

PasswordAdornment.displayName = 'PasswordAdornment';

export default memo(PasswordAdornment);
