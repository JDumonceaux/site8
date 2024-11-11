import React, { LabelHTMLAttributes, memo, JSX } from 'react';
import { styled } from 'styled-components';

type FieldLabelProps = {
  readonly children?: React.ReactNode;
  readonly description?: string;
  readonly label?: string;
  readonly ref?: React.RefObject<HTMLLabelElement>;
  readonly required?: boolean;
  readonly requiredIcon?: React.ReactNode;
  readonly requiredText?: string;
} & LabelHTMLAttributes<HTMLLabelElement>;

const FieldLabel = ({
  children,
  label,
  ref,
  required = false,
  requiredIcon = '*',
  requiredText = 'required',
  ...rest
}: FieldLabelProps): React.JSX.Element => (
  <label ref={ref} {...rest}>
    <StyledRow>
      <StyledLabel>{label}</StyledLabel>
      {required && <VisuallyHidden>{requiredText}</VisuallyHidden>}
      {required && <RequiredSpan>{requiredIcon}</RequiredSpan>}
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
const RequiredSpan = styled.span`
  color: red;
`;
const VisuallyHidden = styled.span`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
