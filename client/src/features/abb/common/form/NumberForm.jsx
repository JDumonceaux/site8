import React, { memo } from 'react';

import GblAutoNumericInput from 'components/util/GblAutoNumericInput';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FieldLabel from './FieldLabel';
import FieldMargin from './FieldMargin';
import FieldMessages from './FieldMessages';
import FieldWrapper from './FieldWrapper';

const NumberForm = ({
  errorMessage,
  extra,
  id,
  label,
  labelProps,
  margin,
  required = false,
  ...rest
}) => (
  <FieldMargin margin={margin}>
    <FieldWrapper required={required}>
      <FieldLabel
        id={id}
        label={label}
        required={required}
        {...labelProps}
        extra={extra}
      />
      <InputWrapper>
        <GblAutoNumericInput
          id={id}
          {...rest}
        />
      </InputWrapper>
      <FieldMessages errorMessage={errorMessage} />
    </FieldWrapper>
  </FieldMargin>
);

NumberForm.propTypes = {
  errorMessage: PropTypes.string,
  extra: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.string,
  labelProps: PropTypes.object,
  margin: PropTypes.string,
  required: PropTypes.bool,
};

NumberForm.displayName = 'NumberForm';

export default memo(NumberForm);

const InputWrapper = styled.div`
  display: inline-flex;
  position: relative;
`;
