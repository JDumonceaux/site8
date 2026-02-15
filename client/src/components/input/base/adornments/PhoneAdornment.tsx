import type { HTMLAttributes, JSX, Ref } from 'react';

import { PhoneIcon as Icon } from '@components/icons/PhoneIcon';
import styled from 'styled-components';

export type PhoneAdornmentProps = Readonly<
  HTMLAttributes<HTMLDivElement> & {
    ref?: Ref<HTMLDivElement>;
  }
>;

const PhoneAdornment = ({
  ref,
  ...props
}: PhoneAdornmentProps): JSX.Element => (
  <Container
    data-testid="phone-icon"
    ref={ref}
    {...props}
  >
    <StyledIcon />
  </Container>
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
