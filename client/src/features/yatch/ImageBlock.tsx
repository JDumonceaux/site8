import { memo } from 'react';

import styled from 'styled-components';

type ImageBlockProps = {
  alt?: string;
  src?: string | undefined;
  title?: string;
};

const ImageBlock = ({ alt, src, title }: ImageBlockProps) => {
  if (src == null || src.trim() === '') return null;

  return (
    <Section>
      {title != null && title !== '' ? <Title>{title}</Title> : null}
      <StyledImg
        alt={alt ?? title ?? ''}
        loading="lazy"
        src={src}
        title={title != null && title !== '' ? title : undefined}
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
  color: var(--text-inverted-color);
  background: var(--text-secondary-color);
  padding: 12px 16px 6px;
  text-align: center;
  margin-top: 2px;
`;

const StyledImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;
