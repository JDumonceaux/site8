import React, { memo } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const FieldMessages = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return (
    <ErrorMessage
      role="alert"
      aria-live="polite"
    >
      {errorMessage}
    </ErrorMessage>
  );
};

FieldMessages.propTypes = {
  errorMessage: PropTypes.string,
};

FieldMessages.displayName = 'FieldMessages';

export default memo(FieldMessages);

const ErrorMessage = styled.div`
  color: #f03040;
  font-size: 12px;
  margin-top: 4px;
`;
