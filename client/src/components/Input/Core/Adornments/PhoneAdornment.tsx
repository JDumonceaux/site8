import type { JSX, HTMLAttributes, Ref } from 'react';

import { PhoneIcon as Icon } from 'components/icons/PhoneIcon';
import styled from 'styled-components';

/**
 * Props for the phone adornment container.
 */
export type PhoneAdornmentProps = HTMLAttributes<HTMLDivElement> & {
  /** Forwarded ref to the container div */
  ref?: Ref<HTMLDivElement>;
};

/**
 * Renders a phone icon inside a styled container.
 */
function PhoneAdornment({ ref, ...props }: PhoneAdornmentProps): JSX.Element {
  return (
    <Container data-testid="Phone icon" ref={ref} {...props}>
      <StyledIcon />
    </Container>
  );
}

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
