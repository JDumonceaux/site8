import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  memo,
  useRef,
  useId,
} from 'react';
import styled from 'styled-components';
import ClearAdornment from '../Adornments/ClearAdornment';
import StartAdornment from '../Adornments/StartAdornment';
import { TooltipBaseProps } from '../Tooltip/TooltipBase';
import LabelRow, { LabelProps } from '../LabelRow/LabelRow';
import FooterRow from '../FooterRow/FooterRow';

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
  readonly value: string | number | string[];
  readonly inputRef?: React.RefObject<HTMLInputElement>;
  readonly description?: string;
  readonly type: HTMLInputTypeAttribute;
  readonly labelProps?: LabelProps;
  readonly toolTipProps?: TooltipBaseProps;
  readonly endAdornment?: React.ReactNode;
  readonly startAdornment?: React.ReactNode;
  readonly showClear?: boolean;
  readonly allowedCharacters?: RegExp;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onClear?: (id: string) => void;
} & Omit<LabelProps, 'ref' | 'onClick' | 'onChange'> &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | 'accesskey'
    | 'autocorrect'
    | 'id'
    | 'ref'
    | 'name'
    | 'onChange'
    | 'value'
    | 'onClick'
  >;

// Input Attributes
// accesskey: never; // Don't use - not accessible
// autocorrect: a non-standard Safari attribute

const InputBase = ({
  value,
  inputRef,
  label,
  // labelRef,
  type,
  description,
  labelProps,
  toolTipProps,
  endAdornment,
  startAdornment,
  showClear = true,
  required,

  // showCounter = false,
  // showError = true,
  // showRequired = true,
  // requiredLabel = 'Required',
  // requiredLabelProps,
  onChange,
  onClear,

  ...rest
}: InputBaseProps): JSX.Element => {
  const maxLength = rest.maxLength;
  const tempId = rest.id || useId();
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
  const counterId = 'counter-' + tempId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    e.preventDefault();
  };

  const inputRefLocal = inputRef || useRef<HTMLInputElement>();

  const handleClear = () => {
    onClear && onClear(tempId);
    inputRefLocal.current?.focus();
  };

  const showClearButton = showClear && characterCount > 0 && onClear;
  const props = { ...rest, id: tempId, required: required };

  return (
    <div id={tempId}>
      <LabelRow
        htmlFor={tempId}
        label={label}
        {...labelProps}
        required={required}
      />
      <FieldWrapper>
        <StartAdornment>{startAdornment}</StartAdornment>
        <StyledInput
          key={tempId}
          value={value}
          type={type}
          {...props}
          //  ref={inputRefLocal}
          aria-describedby={counterId}
          onChange={handleChange}
        />
        {showClearButton ? <ClearAdornment onClick={handleClear} /> : null}
        {/* <EndAdornment>{endAdornment}</EndAdornment> */}
      </FieldWrapper>
      <FooterRow {...rest} />
    </div>
    // <StyledFormField id={id}>
    //   <LabelBase
    //     label={label}
    //     ref={labelRef}
    //     {...labelProps}
    //     required={required}
    //     description={description}
    //     endAdornment={<Tooltip.QuestionMark {...toolTipProps} />}>
    //     <FieldWrapper>
    //       <StartAdornment>{startAdornment}</StartAdornment>
    //       <StyledInput
    //         id={id}
    //         key={id}
    //         value={value}
    //         type={type}
    //         {...rest}
    //         ref={inputRefLocal}
    //         aria-describedby={counterId}
    //         onChange={handleChange}
    //       />
    //       {showClearButton ? <ClearAdornment onClick={handleClear} /> : null}
    //       {/* <EndAdornment>{endAdornment}</EndAdornment> */}
    //     </FieldWrapper>
    //   </LabelBase>

    //   {/* <StyledFoooter>
    //     <InputHelp helpText={helpText} {...helpProps} />
    //     <InputCounter
    //       id={counterId}
    //       maxLength={maxLength}
    //       showCounter={showCounter}
    //       characterCount={characterCount}
    //     />
    //   </StyledFoooter> */}
    // </StyledFormField>
  );
};

InputBase.displayName = 'InputBase';

export default memo(InputBase);

export type { InputBaseProps };

const FieldWrapper = styled.div`
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
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: inherit;
  background-color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border: none;
  height: 32px;
  width: 100%;
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
