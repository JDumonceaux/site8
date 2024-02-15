import { LabelHTMLAttributes } from 'react';
import { styled } from 'styled-components';

type TextLabelProps = {
  readonly isValid?: boolean;
  readonly errorText?: string;
} & LabelHTMLAttributes<HTMLLabelElement>;

const StyledLabel = styled.label<{ $isValid: boolean }>`
  color: ${(props) => (props.$isValid ? '#212121' : '#ff0000')};
  font-size: 0.9rem;
  letter-spacing: 0.25px;
  line-height: 18px;
  font-weight: 400;
  margin-bottom: 4px;
  & span: {
    padding-left: 6px;
  }
`;

const StyledSpan = styled.span`
  padding-left: 6px;
`;

export function TextLabel({
  id,
  children,
  isValid = true,
  errorText,
  ...rest
}: TextLabelProps): JSX.Element {
  // Add error messages and correction suggestions directly into the <label> tag
  return (
    <StyledLabel $isValid={isValid} htmlFor={id} {...rest}>
      {children}
      {!isValid ? <StyledSpan>- {errorText}</StyledSpan> : null}
    </StyledLabel>
  );
}
