import * as Form from '@radix-ui/react-form';
import React, { InputHTMLAttributes, memo } from 'react';
import { styled } from 'styled-components';

type InputTextProps = {
  readonly id: string;
  readonly label?: string;
  readonly inputRef?: React.RefObject<HTMLInputElement>;
  readonly labelRef?: React.RefObject<HTMLLabelElement>;
  readonly hasError?: boolean;
  readonly errorText?: React.ReactNode | string[] | string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>;

const InputText = ({
  id,
  label,
  inputRef,
  labelRef,
  hasError = false,
  type = 'text',
  ...rest
}: InputTextProps): JSX.Element => (
  <Form.Field className="FormField" id={id} name={id}>
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
      }}>
      <StyledLabel ref={labelRef}>{label}</StyledLabel>
      <StyledMessage match="valueMissing">
        Please enter your email
      </StyledMessage>
      <StyledMessage match="typeMismatch">
        Please provide a valid email
      </StyledMessage>
    </div>
    <Form.Control asChild>
      <StyledInput type={type} {...rest} ref={inputRef} value="W" />
    </Form.Control>
  </Form.Field>
);

InputText.displayName = 'InputText';

export default memo(InputText);

const StyledInput = styled.input`
  color: var(--input-color, "#ffffff");
  background-color: var(--input-background, "#00000");
  border-radius: var(--input-border-radius, 0);
  border-color: var(--input-border-color, "#465262");
  border: 1px solid:
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  line-height: 1;
  padding: 0 10px;
  height: 35px;
  font-size: 15px;
 
  box-shadow: 0 0 0 1px black;
  ::hover {
  box-shadow: 0 0 0 1px black;}
  ::focus {
   box-shadow: 0 0 0 2px black;
   ::selection {
   background-color: black;
  } 
`;
const StyledLabel = styled(Form.Label)`
  color: var(---input-label-color, '#ffffff');
  font-size: 15px;
  font-weight: 500;
  line-height: 35px;
`;
const StyledMessage = styled(Form.Message)`
  color: var(---input-label-color, '#ffffff');
  font-size: 13px;
  opacity: 0.8;
`;
