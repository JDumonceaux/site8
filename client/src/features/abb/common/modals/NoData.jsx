import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const NoData = ({ title }) => {
  return (
    <NoDataDiv>
      <i className="fal fa-file-alt fa-5x" />
      <p>{title}</p>
    </NoDataDiv>
  );
};

NoData.propTypes = {
  title: PropTypes.string,
};

export default NoData;

const NoDataDiv = styled.div`
  display: flex;
  width: 560px;
  margin: 0 auto;
  padding: 15px;
  background-color: #f5f5f5;
  font-size: 16px;
  text-align: center;
  > p {
    margin: 20px;
  }
`;
