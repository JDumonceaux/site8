import { memo } from 'react';

import styled from 'styled-components';
import type { MusicItem } from 'types/MusicItem';

type ItemRendererProps = {
  data: {
    items: MusicItem[];
  };
  index: number;
  style: React.CSSProperties;
};

const ItemRenderer = memo(({ data, index, style }: ItemRendererProps) => {
  const item = data.items[index];
  return (
    <div key={index} style={style}>
      <div>{item.description}</div>
      <StyledIframe src={item.url} title="YouTube video player" />
    </div>
  );
});

ItemRenderer.displayName = 'ItemRenderer';

export default ItemRenderer;

const StyledIframe = styled.iframe`
  allow: accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;
  height: 200px;
  width: 560px;
`;
