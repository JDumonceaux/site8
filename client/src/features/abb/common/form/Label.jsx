import React from 'react';

import styled from 'styled-components';
import FieldLabel from './FieldLabel';
import FieldMargin from './FieldMargin';

const Label = ({ children, margin, ...rest }) => (
  <FieldMargin margin={margin}>
    <FieldLabel {...rest} />
    <Content>{children}</Content>
  </FieldMargin>
);

export default Label;

const Content = styled.div``;
