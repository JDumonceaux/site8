import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const GridLink = ({ children, to }) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

export default GridLink;

const StyledLink = styled(Link)`
  text-decoration: underline;
`;
