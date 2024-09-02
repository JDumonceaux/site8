import * as Form from '@radix-ui/react-form';
import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  memo,
} from 'react';
import { styled } from 'styled-components';

import DeleteAdornment from '../Adornments/DeleteAdornment';
import ErrorAdornment from '../Adornments/ErrorAdornment';
import InputCounter from '../InputCounter/InputCounter';
import InputHelp, { InputHelpProps } from '../InputHelp/InputHelp';
import InputTooltip, { InputTooltipProps } from '../InputTooltip/InputTooltip';
import LabelBase from '../LabelBase/LabelBase';

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
  readonly helpProps?: InputHelpProps;
  readonly toolTipProps?: InputTooltipProps;
  readonly endAdornment?: React.ReactNode;
  readonly startAdornment?: React.ReactNode;
  readonly showClear?: boolean;
  readonly showError?: boolean;
  readonly showCounter?: boolean;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'accesskey' | 'autocorrect' | 'id' | 'name'
>;

// Input Attributes
// accesskey: never; // Don't use - not accessible
// autocorrect: a non-standard Safari attribute

const InputBase = ({
  id = 'x',
  inputRef,
  label,
  labelRef,
  type,
  labelProps,
  messageProps,
  helpProps,
  toolTipProps,
  endAdornment,
  startAdornment,
  showClear = true,
  showCounter = false,
  showError = true,
  ...rest
}: InputBaseProps): JSX.Element => {
  const { match, name } = messageProps || {};
  const maxLength = { ...rest }.maxLength;
  const value = { ...rest }.value;
  const characterCount = (() => {
    if (typeof value === 'string' || value instanceof String) {
      return value.length;
    } else if (typeof value === 'number' || value instanceof Number) {
      return value.toString().length;
    } else if (Array.isArray(value)) {
      return value.reduce((acc, val) => acc + val.length, 0);
    } else {
      return 0;
    }
  })();
  const counterId = 'counter-' + id;

  return (
    <StyledFormField id={id} name={id}>
      <StyledHeader>
        <LabelBase label={label} ref={labelRef} {...labelProps}>
          <Form.Message match={match}>{name}</Form.Message>
        </LabelBase>
        <InputTooltip {...toolTipProps} />
      </StyledHeader>
      <Form.Control asChild>
        <StyledInputWrapper>
          {startAdornment}
          <StyledInput
            type={type}
            {...rest}
            ref={inputRef}
            aria-describedby={counterId}
          />
          {showError ? <ErrorAdornment /> : null}
          {showClear ? <DeleteAdornment /> : null}
          {endAdornment}
        </StyledInputWrapper>
      </Form.Control>
      <StyledFoooter>
        <InputHelp {...helpProps} />
        <InputCounter
          id={counterId}
          maxLength={maxLength}
          showCounter={showCounter}
          characterCount={characterCount}
        />
      </StyledFoooter>
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
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  justify-content: flex-start;
  color: var(--input-color, '#ffffff');
  background-color: var(--input-background, '#00000');
  border-radius: var(--input-border-radius, 0);
  width: 100%;
  &:focus:within {
    box-shadow: 0 0 0 1px var(--input-border-focus-color);
  }
`;
const StyledInput = styled.input`
  color: inherit;
  background-color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 0 10px;
  height: 35px;
  font-size: 15px;
  border: none;
  //box-shadow: 0 0 0 1px var(--input-border-color, '#d4d4d4');
  // &:hover {
  //   box-shadow: 0 0 0 1px var(--input-border-hover-color);
  // }

  // &::selection {
  //   //  Accessibility don't override unless you have a good reason
  // }
  // &::spelling-error {
  //   text-decoration: wavy underline var(--input-error);
  // }
  // &::grammar-error {
  //   text-decoration: underline var(--input-error);
  // }
  // &::placeholder {
  //   font-size: 0.9rem;
  //   color: var(--input-placeholder-color, '#d4d4d4');
  // }
  // &:invalid {
  //   color: var(--input-error);
  // }
  // &[required] {
  //   border-left: 3px solid var(--input-border-required-color, '#ff0000');
  // }
  // @supports not selector(:user-invalid) {
  //   input:invalid {
  //     color: var(--input-error);
  //   }
  //   input:valid {
  //     /* Valid input UI styles */
  //   }
  // }
`;
const StyledFoooter = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  padding: 6px 0px;
  > div:first-child {
    flex-grow: 1;
  }
`;
const StyledHeader = StyledFoooter;
