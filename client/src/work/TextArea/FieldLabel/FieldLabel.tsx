import React, { LabelHTMLAttributes, memo, JSX } from 'react';
import { styled } from 'styled-components';

type FieldLabelProps = {
  readonly children?: React.ReactNode;
  readonly description?: string;
  readonly label?: string;
  readonly ref?: React.RefObject<HTMLLabelElement>;
} & LabelHTMLAttributes<HTMLLabelElement>;

const FieldLabel = ({
  children,
  label,
  ref,
  ...rest
}: FieldLabelProps): JSX.Element => (
  <label ref={ref} {...rest}>
    <StyledRow>
      <StyledLabel>{label}</StyledLabel>
    </StyledRow>
    {children}
  </label>
);

FieldLabel.displayName = 'FieldLabel';

export default memo(FieldLabel);

export type { FieldLabelProps };

const StyledLabel = styled.div`
  color: var(--input-label-color, '#ffffff');
  font-size: 15px;
  font-weight: 500;
`;
const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  padding: 4px 0px;
  > div:first-child {
    flex-grow: 1;
  }
`;
