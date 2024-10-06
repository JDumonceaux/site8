import { memo } from 'react';

import { ExclamationTriangleIcon as Icon } from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';

type ErrorAdornmentProps = {
  readonly ref?: React.Ref<HTMLDivElement>;
  readonly iconProps?: IconProps;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'data-testid'>;

const ErrorAdornment = ({ ref, iconProps, ...rest }: ErrorAdornmentProps) => (
  <div data-testid="Email icon" ref={ref} {...rest}>
    <Icon {...iconProps} />
  </div>
);

ErrorAdornment.displayName = 'ErrorAdornment';

export default memo(ErrorAdornment);
