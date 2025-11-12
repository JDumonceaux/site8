import React from 'react';

import { msgFormatter } from 'app/util';
import TextArea from 'empower-components/TextArea';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Description = ({ ...rest }) => {
  return (
    <StyledTextArea
      id="description"
      label={msgFormatter('description')()}
      maxLength="32000"
      rows="5"
      {...rest}
    />
  );
};

Description.propTypes = {
  // Accepts any additional props passed to TextArea component
};

export default Description;

const StyledTextArea = styled(TextArea)`
  width: 100%;
  resize: vertical;
  min-height: 100px;
`;
