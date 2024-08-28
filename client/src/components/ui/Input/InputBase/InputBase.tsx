import * as Form from '@radix-ui/react-form';
import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  memo,
} from 'react';
import { styled } from 'styled-components';

import LabelBase from '../LabelBase/LabelBase';
import ValidityState from '../ValidityState/ValidityState';

// Most attributes have an effect on only
// a specific subset of input types. In addition, the way some
// attributes impact an input depends on the input type,
// impacting different input types in different ways.

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
//
// ACCESSIBILITY: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-readonly

declare const validityMatchers: readonly [
  'badInput',
  'patternMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'stepMismatch',
  'tooLong',
  'tooShort',
  'typeMismatch',
  'valid',
  'valueMissing',
];

type InputBaseProps = {
  readonly errorText?: React.ReactNode | string | string[];
  readonly id?: string;
  readonly inputRef?: React.RefObject<HTMLInputElement>;
  readonly label?: string;
  readonly labelRef?: React.RefObject<HTMLLabelElement>;
  readonly labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  readonly type: HTMLInputTypeAttribute;
  readonly messageProps?: Form.FormMessageProps;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'accesskey' | 'id' | 'name'>;

// accesskey: never; // Don't use - not accessible

const InputBase = ({
  id = 'x',
  inputRef,
  label,
  labelRef,
  type,
  labelProps,
  messageProps,
  ...rest
}: InputBaseProps): JSX.Element => {
  console.log('messageProps:', messageProps);
  const { match, name } = messageProps || {};
  return (
    <StyledFormField id={id} name={id}>
      <LabelBase label={label} ref={labelRef} {...labelProps}>
        <ValidityState />
      </LabelBase>
      <Form.Control asChild>
        <StyledInput type={type} {...rest} ref={inputRef} />
      </Form.Control>
      <Form.Message match={match}>{name}</Form.Message>
    </StyledFormField>
  );
};

InputBase.displayName = 'InputBase';

export default memo(InputBase);

export type { InputBaseProps };

const StyledFormField = styled(Form.Field)`
  display: grid;
  margin-bottom: 10px;
`;
const StyledInput = styled.input`
  color: var(--input-color, '#ffffff');
  background-color: var(--input-background, '#00000');
  border-radius: var(--input-border-radius, 0);
  border: 1px solid var(--input-border-color, '#d4d4d4');
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  line-height: 1;
  padding: 0 10px;
  height: 35px;
  font-size: 15px;
  //box-shadow: 0 0 0 1px var(--input-border-color, '#d4d4d4');
  &:hover {
    box-shadow: 0 0 0 1px var(--input-border-hover-color);
  }
  &:focus {
    box-shadow: 0 0 0 1px var(--input-border-focus-color);
  }
  &::selection {
    //  Accessibility don't override unless you have a good reason
  }
  &::spelling-error {
    text-decoration: wavy underline var(--input-error);
  }
  &::grammar-error {
    text-decoration: underline var(--input-error);
  }
  &::placeholder {
    font-size: 0.9rem;
    color: var(--input-placeholder-color, '#d4d4d4');
  }
  &:invalid {
    color: var(--input-error);
  }
  &[required] {
    border-left: 3px solid var(--input-border-required-color, '#ff0000');
  }
  @supports not selector(:user-invalid) {
    input:invalid {
      color: var(--input-error);
    }
    input:valid {
      /* Valid input UI styles */
    }
  }
`;
