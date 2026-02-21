import type { ChangeEvent, JSX } from 'react';

import type { InputBaseProps } from '../base/input-base/InputBase';
import styled from 'styled-components';

export type InputCheckboxProps = Omit<
  InputBaseProps,
  | 'height'
  | 'max'
  | 'min'
  | 'mozactionhint'
  | 'onChange'
  | 'src'
  | 'step'
  | 'type'
  | 'width'
> & {
  /** Field identifier */
  fieldName: string;
  /** Label text for the checkbox */
  label: string;
  /** Row identifier */
  lineId: string;
  /** Change handler receives row, field, and native event */
  onChange: (
    lineId: string,
    fieldName: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  /** Always "checkbox" for this component */
  type?: 'checkbox';
};

const InputCheckbox = ({
  fieldName,
  id,
  label,
  lineId,
  onChange,
  type = 'checkbox',
  ...rest
}: InputCheckboxProps): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(lineId, fieldName, e);
  };

  return (
    <Wrapper>
      <label htmlFor={id}>
        <input
          id={id}
          name={fieldName}
          onChange={handleChange}
          type={type}
          {...rest}
        />
        {label}
      </label>
    </Wrapper>
  );
};

InputCheckbox.displayName = 'InputCheckbox';
export default InputCheckbox;

const Wrapper = styled.div`
  width: 100%;

  label {
    display: inline-flex;
    align-items: center;
    width: 100%;
    min-height: 2.25rem;
    padding: 0;
    color: var(--input-color);
    font-size: var(--font-size-sm);
    cursor: pointer;
  }

  input[type='checkbox'] {
    width: 1rem;
    height: 1rem;
    margin-inline-end: 0.625rem;
    accent-color: var(--status-info);
  }

  input[type='checkbox']:disabled {
    cursor: not-allowed;
  }

  label:has(input[type='checkbox']:disabled) {
    color: var(--disabled-text);
    cursor: not-allowed;
  }
`;
