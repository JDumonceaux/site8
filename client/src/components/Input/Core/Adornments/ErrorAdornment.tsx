import { memo } from 'react';

import { ExclamationTriangleIcon as Icon } from '@radix-ui/react-icons';
import type { IconProps } from '@radix-ui/react-icons/dist/types';

type Props = {
  readonly children?: never;
  readonly iconProps?: IconProps;
  readonly ref?: React.Ref<SVGSVGElement>;
} & Omit<React.HTMLAttributes<HTMLOrSVGElement>, 'data-testid'>;

const ErrorAdornment = ({ ref, ...rest }: Props) => (
  <Icon data-testid="Error icon" ref={ref} {...rest} />
);

ErrorAdornment.displayName = 'ErrorAdornment';

export default memo(ErrorAdornment);
