import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const GridRight = ({ children }) => {
  return <RightAlignedDiv>{children}</RightAlignedDiv>;
};

GridRight.propTypes = {
  children: PropTypes.node,
};

export default GridRight;

const RightAlignedDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
