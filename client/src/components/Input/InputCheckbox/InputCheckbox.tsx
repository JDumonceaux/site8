import type { FC, ChangeEvent } from 'react';

import styled from 'styled-components';

import type { InputBaseProps } from '../Core/InputBase/InputBase';

export type InputCheckboxProps = Omit<
  InputBaseProps,
  'height' | 'max' | 'min' | 'mozactionhint' | 'src' | 'step' | 'type' | 'width'
> & {
  /** Field identifier */
  fieldName: string;
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

/**
 * Renders a checkbox input with a label.
 */
export const InputCheckbox: FC<InputCheckboxProps> = ({
  fieldName,
  id,
  label,
  lineId,
  onChange,
  type = 'checkbox',
  ...rest
}: InputCheckboxProps) => {
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
