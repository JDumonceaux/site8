import React, { memo } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import FieldLabel from './FieldLabel';
import FieldMargin from './FieldMargin';

const Label = ({ children, margin, ...rest }) => (
  <FieldMargin margin={margin}>
    <FieldLabel {...rest} />
    <Content>{children}</Content>
  </FieldMargin>
);

Label.propTypes = {
  children: PropTypes.node,
  margin: PropTypes.string,
};

Label.displayName = 'Label';

export default memo(Label);

const Content = styled.div``;
