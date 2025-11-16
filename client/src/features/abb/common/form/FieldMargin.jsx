import React, { memo } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const FieldMargin = ({ children, margin }) => (
  <ContainerDiv $margin={margin}>{children}</ContainerDiv>
);

FieldMargin.propTypes = {
  children: PropTypes.node,
  margin: PropTypes.string,
};

FieldMargin.displayName = 'FieldMargin';

export default memo(FieldMargin);

const ContainerDiv = styled.div`
  margin-bottom: ${(props) => props.$margin || '0px'};
`;
