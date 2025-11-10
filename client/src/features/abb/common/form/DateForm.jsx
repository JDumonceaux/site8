import React from 'react';

import styled from 'styled-components';
import FieldLabel from './FieldLabel';
import FieldWrapper from './FieldWrapper';

const DateForm = ({
  autoComplete = 'off',
  disabled = false,
  extra,
  id,
  label,
  labelProps,
  required = false,
  size = 'regular',
  ...rest
}) => {
  const handleSearch = () => {
    if (!disabled) {
      handleSearch();
    }
  };

  return (
    <FieldWrapper
      required={required}
      size={size}
    >
      <FieldLabel
        id={id}
        label={label}
        required={required}
        {...labelProps}
        extra={extra}
      />
      <InputWrapper>
        <StyledInput
          disabled={disabled}
          id={id || 'dateForm'}
          // className={`input-form-input ${size} ${
          //     search ? "search" : ""
          // } ${required && !search ? "required" : ""}`}
          required={required}
          type="date"
          autoComplete={autoComplete}
          {...rest}
        />
        <IconWrapper>
          <a onClick={handleSearch}>
            <i className="far fa-calendar-alt" />
          </a>
        </IconWrapper>
      </InputWrapper>
    </FieldWrapper>
  );
};

export default DateForm;

const IconWrapper = styled.div`
  height: 32px;
  width: 32px;
  background-color: #3366fb;
  border-radius: 0px 4px 4px 0px;
  display: inline-flex;
  cursor: pointer;
  i {
    color: #fff;
    font-size: 16px;
    font-weight: 300;
  }
  a {
    display: flex;
    margin: auto;
  }
  a,
  a:focus {
    outline: none;
    text-decoration: none;
  }
`;
const InputWrapper = styled.div`
  display: inline-flex;
  position: relative;
`;
const StyledInput = styled.input`
  border: 1px solid #d2d2d2;
  &:invalid {
    border-color: #f03040;
  }
  width: auto;
  box-sizing: border-box;
  flex-grow: 1;
  flex-basis: 100%;
  min-width: 0;
  padding: 0px 6px;
  &:focus {
    border: 1px solid #3366ff;
  }
  &:disabled {
    background: #ebebeb 0% 0% no-repeat padding-box;
    border: 1px solid #bababa;
    color: #9f9f9f;
  }
  &:focus-visible {
    outline-offset: none;
    outline: none;
  }
  &::placeholder {
    color: #b2b0b0;
  }
  &::-webkit-calendar-picker-indicator {
    color: #3366ff;
  }
`;
