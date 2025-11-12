import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const GridNoWrap = ({ children }) => {
  return <NoWrapDiv>{children}</NoWrapDiv>;
};

GridNoWrap.propTypes = {
  children: PropTypes.node,
};

export default GridNoWrap;

const NoWrapDiv = styled.div`
  word-break: normal;
  overflow: hidden;
`;
