import { memo } from 'react';

import { ExclamationTriangleIcon as Icon } from '@radix-ui/react-icons';

type ErrorAdornmentProps = {
  readonly ref?: React.Ref<HTMLDivElement>;
};

const ErrorAdornment = ({ ref, ...rest }: ErrorAdornmentProps) => (
  <div data-testid="Email icon" ref={ref} {...rest}>
    <Icon />
  </div>
);

ErrorAdornment.displayName = 'ErrorAdornment';

export default memo(ErrorAdornment);
