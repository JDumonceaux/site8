import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  memo,
  useRef,
} from 'react';

import { InputHelpProps } from '../../InputHelp/InputHelp';
import styled from 'styled-components';
import LabelBase, { LabelBaseProps } from '../LabelBase/LabelBase';
import Tooltip from '../Tooltip/Tooltip';
import { TooltipBaseProps } from '../Tooltip/TooltipBase';
import InputBase, { InputBaseProps } from '../InputBase/InputBase';



type InputWrapperProps = {
  readonly allowedCharacters?: RegExp;
  readonly children: React.ReactNode;
  readonly description?: string;
  readonly endAdornment?:
    | (boolean | number | React.ReactNode | string)[]
    | boolean
    | number
    | React.ReactNode
    | string;
  readonly errorText?: React.ReactNode | string | string[];
  readonly helpProps?: InputHelpProps;
  readonly helpText?: React.ReactNode | string | string[];
  readonly id: string;
  readonly inputRef?: React.RefObject<HTMLInputElement>;
  readonly label?: string;
  readonly labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  readonly labelRef?: React.RefObject<HTMLLabelElement>;
  readonly messageProps?: any;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onClear?: (id: string) => void;
  readonly requiredLabel?: string;
  readonly requiredLabelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;  
  readonly showClear?: boolean;
  readonly showCounter?: boolean;
  readonly showError?: boolean;
  readonly showRequired?: boolean;
  readonly startAdornment?: boolean | number | React.ReactNode | string;
  readonly toolTipProps?: TooltipBaseProps;
  readonly type: HTMLInputTypeAttribute;
  readonly value: number | string | string[];
} & InputBaseProps & LabelBaseProps;

const InputWrapper = ({
  description,
  id,
  label,
  labelProps,
  labelRef,
 
  toolTipProps,
  

  ...rest
}: InputWrapperProps): React.JSX.Element => (
    <StyledFormField id={id}>
      <LabelBase
        label={label}
        ref={labelRef}
        {...labelProps}
        description={description}
        endAdornment={<Tooltip.QuestionMark {...toolTipProps} />}
        required={required}>
<InputBase {...rest} />
      </LabelBase>

      {/* <StyledFoooter>
        <InputHelp helpText={helpText} {...helpProps} />
        <InputCounter
          id={counterId}
          maxLength={maxLength}
          showCounter={showCounter}
          characterCount={characterCount}
        />
      </StyledFoooter> */}
    </StyledFormField>
  );

InputWrapper.displayName = 'InputWrapper';

export default memo(InputWrapper);

export type { InputWrapperProps };

const StyledFormField = styled.div`
  display: grid;
  margin-bottom: 16px;
`;
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: var(--input-color);
  background-color: var(--input-background-color);
  border-radius: var(--input-border-radius, 0);
  border: 1px solid var(--input-border-color);
  width: 100%;

  :focus {
    background-color: var(--input-background-focus-color);
    border-bottom: 1.5px solid var(--input-border-focus-color);
  }

  // &:focus:within {
  //   box-shadow: 0 0 0 1px var(--input-border-focus-color);
  // }
  &:has(input[required]) {
    border-left: 3px solid var(--input-border-required-color);
  }
`;
const StyledInput = styled.input`
  color: inherit;
  background-color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  //font-size: 15px;
  border: none;
  height: 32px;
  //box-shadow: 0 0 0 1px var(--input-border);
  // &:hover {
  //   box-shadow: 0 0 0 1px var(--input-border-hover);
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
  //   color: var(--input-placeholder);
  // }
  // &:invalid {
  //   color: var(--input-error);
  // }
  // &[required] {
  //   border-left: 3px solid var(--input-border-required);
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
  > div:first-child {
    flex-grow: 1;
  }
`;
