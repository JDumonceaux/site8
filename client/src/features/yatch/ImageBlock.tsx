import { memo } from 'react';

import styled from 'styled-components';

type ImageBlockProps = {
  alt?: string;
  src?: string | undefined;
  title?: string;
};

const ImageBlock = ({ alt, src, title }: ImageBlockProps) => {
  if (!src) return null;

  return (
    <Section>
      {title ? <Title>{title}</Title> : null}
      <StyledImg
        alt={alt ?? title ?? ''}
        src={src}
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
