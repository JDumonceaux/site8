import { LabelHTMLAttributes } from 'react';
import { styled } from 'styled-components';

type TextLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const TextLabel = ({
  children,
  id,

  ...rest
}: TextLabelProps): JSX.Element => {
  // Add error messages and correction suggestions directly into the <label> tag
  return (
    <StyledLabel htmlFor={id} {...rest}>
      {children}
    </StyledLabel>
  );
};

TextLabel.displayName = 'TextLabel';

const StyledLabel = styled.label`
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
