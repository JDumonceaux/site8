import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { msgFormatter } from 'app/util';
import styled from 'styled-components';

// SectionTitle: Title for flyout menu sections
const SectionTitle = ({ showPath, titlePath }) => (
  <Title>
    <div>{msgFormatter(titlePath)()}</div>
    <div>{showPath ? msgFormatter(showPath)() : msgFormatter('show')()}</div>
  </Title>
);

SectionTitle.propTypes = {
  showPath: PropTypes.string,
  titlePath: PropTypes.string,
};

SectionTitle.displayName = 'SectionTitle';

SectionTitle.propTypes = {
  showPath: PropTypes.string,
  titlePath: PropTypes.string,
};

export default memo(SectionTitle);
const Title = styled.div`
  font-size: 16px;
  line-height: 30px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d2d2d2;
  margin-bottom: 10px;
  > div:last-child {
    font-size: 14px;
    font-weight: normal;
  }
`;
