import React, { memo } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const FieldWrapper = ({ children, required = false, size = 'regular' }) => (
  <InputFormContainer
    required={required}
    size={size}
  >
    {children}
  </InputFormContainer>
);

FieldWrapper.propTypes = {
  children: PropTypes.node,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['regular', 'small', 'large']),
};

FieldWrapper.displayName = 'FieldWrapper';

export default memo(FieldWrapper);

const InputFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  width: auto;
  min-width: 130px;
  .regular {
    height: 32px;
  }
  .small {
    height: 24px;
  }
`;
