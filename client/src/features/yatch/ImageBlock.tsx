import { memo } from 'react';

import styled from 'styled-components';

const ImageBlock = memo(
  ({
    alt,
    imageTitle,
    src,
    title,
  }: {
    alt?: string;
    imageTitle?: string;
    src: string;
    title: string;
  }) => (
    <ImageSection>
      <StyledTitle>{title}</StyledTitle>
      <img
        alt={alt ?? title}
        src={src}
        {...(imageTitle ? { title: imageTitle } : {})}
      />
    </ImageSection>
  ),
);

ImageBlock.displayName = 'ImageBlock';

export default ImageBlock;

const StyledTitle = styled.div`
  color: #fff;
  background: #585858;
  padding: 12px 16px 6px 16px;
  text-align: center;
  margin-top: 2px;
`;
const ImageSection = styled.div`
  margin-bottom: 16px;
`;
