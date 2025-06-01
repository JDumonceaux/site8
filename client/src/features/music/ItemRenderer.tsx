import type { FC } from 'react';

import styled from 'styled-components';
import type { MusicItem } from 'types/MusicItem';

/**
 * Props for rendering a single music item in a virtual list.
 */
type ItemRendererProps = {
  /** Data object containing the array of music items */
  data: { items: MusicItem[] };
  /** Index of the item to render */
  index: number;
  /** Inline style for positioning provided by the virtual list */
  style: React.CSSProperties;
};

/**
 * Renders a single music item with description and embedded video.
 */
const ItemRenderer: FC<ItemRendererProps> = ({ data, index, style }) => {
  const item = data.items[index];

  return (
    <Container
      style={style}
      role="listitem"
      aria-label={`Music item ${index + 1}: ${item.description}`}>
      <Description>{item.description}</Description>
      <VideoFrame
        src={item.url}
        title={item.description}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        sandbox="allow-scripts allow-same-origin allow-presentation"
      />
    </Container>
  );
};

ItemRenderer.displayName = 'ItemRenderer';
export default ItemRenderer;

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Description = styled.div`
  font-size: 1rem;
  color: var(--palette-text);
`;

const VideoFrame = styled.iframe`
  width: 100%;
  max-width: 560px;
  height: 200px;
  border: none;
`;
