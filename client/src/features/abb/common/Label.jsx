import React from 'react';

import { msgFormatter } from 'app/util';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * A styled label with formatted text and associated content.
 */
const Label = ({ children, className, path, startAdornment }) => (
  <Wrapper className={className}>
    <TextLabel>
      {startAdornment}
      {msgFormatter(path)()}
    </TextLabel>
    <Content>{children}</Content>
  </Wrapper>
);

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  path: PropTypes.string,
  startAdornment: PropTypes.node,
};

export default Label;

const Wrapper = styled.div`
  margin-bottom: 9px;
  font-size: 14px;
`;
const TextLabel = styled.label`
  display: block;
  font-family: 'abbvoice-bold', Verdana, sans-serif;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Content = styled.div`
  font-family: 'abbvoice-regular', Verdana, sans-serif;
`;
