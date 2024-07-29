import * as Form from '@radix-ui/react-form';
import { forwardRef, memo } from 'react';
import { styled } from 'styled-components';

type InputTextProps = {
  readonly id: string;
};

const InputText = forwardRef<HTMLDivElement, InputTextProps>(
  ({ id, ...rest }: InputTextProps, ref): JSX.Element => (
    <Form.Field className="FormField" id={id} name={id} ref={ref}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}>
        <Form.Label className="FormLabel">Email</Form.Label>
        <Form.Message className="FormMessage" match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message className="FormMessage" match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild>
        <StyledInput required type="email" {...rest} />
      </Form.Control>
    </Form.Field>
  ),
);
InputText.displayName = 'InputText';

export default memo(InputText);

const StyledInput = styled.input`
  padding: 0 10px;
  height: 35px;
  line-height: 1;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 15px;
  color: white;
  background-color: var(--black-a5);
  box-shadow: 0 0 0 1px var(--black-a9);
  ::hover {
  box-shadow: 0 0 0 1px black;}
  ::focus {
   box-shadow: 0 0 0 2px black;
   ::selection {
   background-color: var(--black-a9);
  color: white;
  } 

`;
