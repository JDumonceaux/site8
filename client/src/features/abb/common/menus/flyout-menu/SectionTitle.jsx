import React from 'react';

import { msgFormatter } from 'app/util';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SectionTitle = ({ showPath, titlePath }) => {
  return (
    <Title>
      <div>{msgFormatter(titlePath)()}</div>
      <div>{showPath ? msgFormatter(showPath)() : msgFormatter('show')()}</div>
    </Title>
  );
};

SectionTitle.propTypes = {
  showPath: PropTypes.string,
  titlePath: PropTypes.string,
};

export default SectionTitle;
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
