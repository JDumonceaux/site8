import React, { memo, useMemo } from 'react';

import Banner from 'empower-components/Banner';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BannerList = ({
  children,
  level = 'info',
  messages,
  show = true,
  title,
}) => {
  // Early return if not shown
  if (!show) {
    return null;
  }

  // Validate messages is an array
  if (!Array.isArray(messages)) {
    console.error('BannerList: messages prop must be an array');
    return null;
  }

  // Validate messages array is not empty
  if (messages.length === 0) {
    return null;
  }

  // Memoize the message content to avoid recreating on each render
  const messageContent = useMemo(
    () => (
      <BoxDiv>
        <BannerUL>
          {messages.map((message, index) => (
            <li
              key={`banner-message-${index}-${String(message).substring(0, 20)}`}
            >
              {message}
            </li>
          ))}
        </BannerUL>
        {children}
      </BoxDiv>
    ),
    [messages, children],
  );

  return (
    <StyledBanner>
      <Banner
        message={messageContent}
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

BannerList.displayName = 'BannerList';

export default memo(BannerList);

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
