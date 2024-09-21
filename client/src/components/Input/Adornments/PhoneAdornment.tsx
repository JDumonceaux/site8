import { memo } from 'react';
import { styled } from 'styled-components';

import { PhoneIcon as Icon } from 'components/icons/PhoneIcon';

type PhoneAdornmentProps = {
  readonly ref?: React.Ref<HTMLDivElement>;
  //readonly iconProps?: IconProps;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'data-testid'>;

const PhoneAdornment = ({ ref, ...rest }: PhoneAdornmentProps) => (
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
