import React, { memo, useCallback } from 'react';

import PropTypes from 'prop-types';
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
  const handleSearch = useCallback(() => {
    if (!disabled) {
      // TODO: Implement calendar picker functionality
      // This is currently a placeholder
    }
  }, [disabled]);

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
          autoComplete={autoComplete}
          disabled={disabled}
          id={id || 'dateForm'}
          required={required}
          type="date"
          {...rest}
        />
        <IconWrapper>
          <a
            aria-label="Open calendar picker"
            onClick={handleSearch}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSearch();
              }
            }}
            role="button"
            tabIndex={disabled ? -1 : 0}
          >
            <i
              aria-hidden="true"
              className="far fa-calendar-alt"
            />
          </a>
        </IconWrapper>
      </InputWrapper>
    </FieldWrapper>
  );
};

DateForm.propTypes = {
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  extra: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.string,
  labelProps: PropTypes.object,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['regular', 'small', 'large']),
};

DateForm.displayName = 'DateForm';

export default memo(DateForm);

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

  a:focus-visible {
    outline: 2px solid #fff;
    outline-offset: -4px;
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
