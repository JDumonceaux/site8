import { type FC } from 'react';

import styled from 'styled-components';
import type { Video } from 'types/Video';

/** Responsive video embed with title */
export const VideoEmbed: FC<Video> = (
  ({ iframeTitle, title, videoSrc }: Video) => (
    <Section>
      <Heading>{title}</Heading>
      <VideoWrapper>
        <StyledIframe
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts"
          src={videoSrc}
          title={iframeTitle ?? title}
        />
      </VideoWrapper>
    </Section>
  ),
);

VideoEmbed.displayName = 'VideoEmbed';
export default VideoEmbed;

const Section = styled.div`
  margin-bottom: 16px;
`;

const Heading = styled.div`
  color: #fff;
  background: #585858;
  padding: 12px 16px 6px;
  text-align: center;
  margin-top: 2px;
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 aspect ratio */
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;
