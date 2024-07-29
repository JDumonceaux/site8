import { LabelHTMLAttributes } from 'react';
import { styled } from 'styled-components';

type TextLabelProps = {
  readonly hasError?: boolean;
  readonly errorText?: string;
} & LabelHTMLAttributes<HTMLLabelElement>;

export const TextLabel = ({
  id,
  children,
  hasError = true,
  errorText,
  ...rest
}: TextLabelProps): JSX.Element => {
  // Add error messages and correction suggestions directly into the <label> tag
  return (
    <StyledLabel $hasError={hasError} htmlFor={id} {...rest}>
      {children}
      {!hasError ? <StyledSpan>- {errorText}</StyledSpan> : null}
    </StyledLabel>
  );
};

TextLabel.displayName = 'TextLabel';

const StyledLabel = styled.label<{ $hasError: boolean }>`
  color: ${(props) => (props.$hasError ? '#212121' : '#ff0000')};
  font-size: 0.9rem;
  letter-spacing: 0.25px;
  line-height: 18px;
  font-weight: 400;
  display: block;
  margin-bottom: 4px;
  & span: {
    padding-left: 6px;
  }
`;
const StyledSpan = styled.span`
  padding-left: 6px;
`;
