import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const GridLink = ({ children, to }) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

GridLink.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
};

export default GridLink;

const StyledLink = styled(Link)`
  text-decoration: underline;
`;
