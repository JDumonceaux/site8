import type { HTMLAttributes, JSX } from 'react';
import { forwardRef } from 'react';

import { PhoneIcon as Icon } from '@components/icons/PhoneIcon';
import styled from 'styled-components';

export type PhoneAdornmentProps = Readonly<HTMLAttributes<HTMLDivElement>>;

const PhoneAdornment = forwardRef<HTMLDivElement, PhoneAdornmentProps>(
  (props, ref): JSX.Element => (
    <Container
      ref={ref}
      data-testid="phone-icon"
      {...props}
    >
      <StyledIcon />
    </Container>
  ),
);

PhoneAdornment.displayName = 'PhoneAdornment';
export default PhoneAdornment;

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled(Icon)`
  width: 15px;
  height: 15px;
  color: var(--input-icon-color);
`;
