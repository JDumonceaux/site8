import React from 'react';

import Banner from 'empower-components/Banner';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BannerList = ({ children, level, messages, show, title }) => {
  if (!show) {
    return null;
  }

  if (!Array.isArray(messages)) {
    throw new TypeError(`BannerList:  Messages is not an array.`);
  }

  return (
    <StyledBanner>
      <Banner
        message={
          <BoxDiv>
            <BannerUL>
              {messages.map((x, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index}>{x}</li>
              ))}
            </BannerUL>
            {children}
          </BoxDiv>
        }
        level={level}
        title={title}
      />
    </StyledBanner>
  );
};

BannerList.propTypes = {
  children: PropTypes.node,
  level: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  show: PropTypes.bool,
  title: PropTypes.string,
};

export default BannerList;

const StyledBanner = styled.div`
  section > div > div:last-child {
    flex-grow: 1;
  }
`;
const BannerUL = styled.ul`
  list-style-type: disc;
  margin-left: 15px;
  line-height: 16px;
`;
const BoxDiv = styled.div`
  width: 100%;
  overflow: auto;
  max-height: 100px;
  min-height: 50px;
`;
