import type { JSX } from 'react';
import styled from 'styled-components';
import type { Image } from 'types/Image';

/**
 * Renders a titled block with an image.
 */
const ImageBlock = ({ alt, src, title }: Image): JSX.Element | null => (
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
