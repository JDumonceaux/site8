import { memo } from 'react';

// Update the import path below to the actual location of MusicItem type
import type { MusicItem } from '@site8/shared';
import styled from 'styled-components';

/**
 * Props for rendering a single music item in a virtual list.
 */
type ItemRendererProps = {
  /** Data object containing the array of music items */
  data: { items?: MusicItem[] };
  /** Index of the item to render */
  index: number;
};

/**
 * Helper function to safely access array item by index
 */
const getItemAtIndex = (
  items: MusicItem[] | undefined,
  index: number,
): MusicItem | undefined => {
  return items?.[index];
};

/**
 * Renders a single music item with description and embedded video.
 */
const ItemRenderer = memo(
  ({ data, index }: ItemRendererProps): null | React.ReactElement => {
    const item = getItemAtIndex(data.items, index);

    if (!item) return null;

    return (
      <li aria-label={`Music item ${index + 1}: ${item.description}`}>
        <Container>
          <Description>{item.description}</Description>
          <VideoFrame
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            src={item.url}
            title={item.description}
          />
        </Container>
      </li>
    );
  },
);

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
