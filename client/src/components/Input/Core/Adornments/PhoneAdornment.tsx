import React, { memo } from 'react';

import { PhoneIcon as Icon } from 'components/icons/PhoneIcon';
import { styled } from 'styled-components';

type Props = {
  readonly ref?: React.Ref<HTMLDivElement>;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'data-testid'>;

const PhoneAdornment = ({ ref, ...rest }: Props) => (
  <div data-testid="Phone icon" ref={ref} {...rest}>
    <StyledIcon />
  </div>
);

PhoneAdornment.displayName = 'PhoneAdornment';

export default memo(PhoneAdornment);

const StyledIcon = styled(Icon)`
  height: 15px;
  width: 15px;
  color: var(--input-icon-color);
`;
