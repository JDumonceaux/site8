import { memo } from 'react';

import styled from 'styled-components';

const VideoEmbed = memo(
  ({
    iframeTitle,
    title,
    videoSrc,
  }: {
    iframeTitle?: string;
    title: string;
    videoSrc: string;
  }) => (
    <div>
      <StyledTitle>{title}</StyledTitle>
      <VideoContainer>
        <StyledIframe
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts"
          src={videoSrc}
          title={iframeTitle ?? title}
        />
      </VideoContainer>
    </div>
  ),
);

VideoEmbed.displayName = 'VideoEmbed';

export default VideoEmbed;

const VideoContainer = styled.div`
  padding: 56.25% 0 0 0;
  position: relative;
  margin-bottom: 16px;
`;
const StyledTitle = styled.div`
  color: #fff;
  background: #585858;
  padding: 12px 16px 6px 16px;
  text-align: center;
  margin-top: 2px;
`;
const StyledIframe = styled.iframe`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  border: 0;
`;
