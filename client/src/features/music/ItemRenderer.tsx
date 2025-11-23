import type { MusicItem } from '@shared/types/MusicItem';
import styled from 'styled-components';

/**
 * Props for rendering a single music item in a virtual list.
 */
type ItemRendererProps = {
  /** Data object containing the array of music items */
  data: { items: MusicItem[] };
  /** Index of the item to render */
  index: number;
};

/**
 * Renders a single music item with description and embedded video.
 */
const ItemRenderer = ({
  data,
  index,
}: ItemRendererProps): null | React.ReactElement => {
  const item = data.items[index];

  return (
    <li aria-label={`Music item ${index + 1}: ${item.description}`}>
      <Container>
        <Description>{item.description}</Description>
        <VideoFrame
          src={item.url}
          title={item.description}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          sandbox="allow-scripts allow-same-origin allow-presentation"
        />
      </Container>
    </li>
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
