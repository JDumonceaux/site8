import type { ChangeEvent, JSX } from 'react';

import type { InputBaseProps } from '../base-temp/input-base/InputBase';
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
          type={type}
          onChange={handleChange}
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
  margin-bottom: 16px;

  label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  input[type='checkbox'] {
    margin-right: 6px;
  }
`;
