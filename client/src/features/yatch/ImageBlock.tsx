import React, { memo } from 'react';
import styled from 'styled-components';

interface ImageBlockProps {
  src: string;
  alt?: string;
  title?: string;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ alt, src, title }) => {
  if (!src) return null;

  return (
    <Section>
      {title && <Title>{title}</Title>}
      <StyledImg
        src={src}
        alt={alt || title || ''}
        {...(title ? { title } : {})}
        loading="lazy"
      />
    </Section>
  );
};

ImageBlock.displayName = 'ImageBlock';
export default memo(ImageBlock);

const Section = styled.div`
  margin-bottom: 16px;
`;

const Title = styled.div`
  color: #fff;
  background: #585858;
  padding: 12px 16px 6px;
  text-align: center;
  margin-top: 2px;
`;

const StyledImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;
