import type { FC } from 'react';

import styled from 'styled-components';
import type { Image } from 'types/Image';

/**
 * Renders a titled block with an image.
 */
export const ImageBlock: FC<Image> = ({ alt, src, title }: Image) => (
  <Section>
    <Title>{title}</Title>
    <img alt={alt ?? title} src={src} {...(title ? { title } : {})} />
  </Section>
);

ImageBlock.displayName = 'ImageBlock';
export default ImageBlock;

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
