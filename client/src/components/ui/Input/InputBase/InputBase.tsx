import * as Form from '@radix-ui/react-form';
import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  memo,
} from 'react';
import { styled } from 'styled-components';
import LabelBase from '../LabelBase/LabelBase';
import ErrorsBase from '../ErrorsBase/ErrorsBase';

export type InputBaseProps = {
  readonly id: string;
  readonly label?: string;
  readonly type?: HTMLInputTypeAttribute | undefined;
  readonly inputRef?: React.RefObject<HTMLInputElement>;
  readonly labelRef?: React.RefObject<HTMLLabelElement>;
  readonly hasError?: boolean;
  readonly errorText?: React.ReactNode | string[] | string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>;

const InputBase = ({
  id,
  label,
  inputRef,
  labelRef,
  type,
  // hasError = false,
  ...rest
}: InputBaseProps): JSX.Element => (
  <StyledFormField id={id} name={id}>
    <LabelBase label={label} labelRef={labelRef}>
      <ErrorsBase />
    </LabelBase>
    <Form.Control asChild>
      <StyledInput type={type} {...rest} ref={inputRef} />
    </Form.Control>
  </StyledFormField>
);

InputBase.displayName = 'InputBase';

export default memo(InputBase);

const StyledFormField = styled(Form.Field)`
  display: grid;
  margin-bottom: 10px;
`;
const StyledInput = styled.input`
  color: var(--input-color, '#ffffff');
  background-color: var(--input-background, '#00000');
  border-radius: var(--input-border-radius, 0);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  line-height: 1;
  padding: 0 10px;
  height: 35px;
  font-size: 15px;
  box-shadow: 0 0 0 1px var(--input-border-color, '#d4d4d4');
  &:hover {
    box-shadow: 0 0 0 1px var(--input-border-hover-color);
  }
  &:focus {
    box-shadow: 0 0 0 1px var(--input-border-focus-color);
  }
  &:selection {
    //  Accessibility don't override unless you have a good reason
  }
  &:spelling-error {
    text-decoration: wavy underline var(--input-error);
  }
  &:grammar {
    text-decoration: underline var(--input-error);
  }
  &:placeholder {
    font-size: 0.9rem;
    color: var(--input-placeholder-color, '#d4d4d4');
  }
  &:invalid {
    color: var(--input-error);
  }
`;
