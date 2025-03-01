import { memo } from 'react';

import styled from 'styled-components';

import type { InputBaseProps } from '../Core/InputBase/InputBase';

type Props = {
  readonly type?: 'checkbox';
} & Omit<
  InputBaseProps,
  'height' | 'max' | 'min' | 'mozactionhint' | 'src' | 'step' | 'type' | 'width'
>;

// Checked
// Value

// Implicit aria-role => 'checkbox'
const InputCheckbox = ({
  type = 'checkbox',
  lineId,
  fieldName,
  onChange,
  ...rest
}: Props): React.JSX.Element => {
  const { id, label } = rest;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(lineId, fieldName, e);
  };

  return (
    <StyledDiv>
      <label htmlFor={id}>
        <input name={id} type={type} onChange={handleChange} {...rest} />
        {label}
      </label>
    </StyledDiv>
  );
};

InputCheckbox.displayName = 'InputCheckbox';

export default memo(InputCheckbox);

const StyledDiv = styled.div`
  margin-bottom: 16px;
  input {
    margin-right: 6px;
  }
`;
