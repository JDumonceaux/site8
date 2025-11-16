import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// SectionTitle: Renders a styled section title
const SectionTitle = ({ children }) => <StyledDiv>{children}</StyledDiv>;

SectionTitle.propTypes = {
  children: PropTypes.node,
};

SectionTitle.displayName = 'SectionTitle';

export default memo(SectionTitle);

// Styled component for section title
const StyledDiv = styled.div`
  font-size: 18px;
  border-bottom: 1px solid rgb(202, 205, 208);
  padding: 0px 0px 5px;
  margin-bottom: 10px;
`;
