'use client';
import type { ListChildComponentProps } from 'react-window';
import { MusicItem } from 'services/types/MusicItem';

export const ItemRenderer = ({
  data,
  index,
  style,
}: ListChildComponentProps) => {
  const item = data.items[index] as MusicItem;
  return (
    <div key={index} style={style}>
      <div>{item.description}</div>
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        height={200}
        src={item.url}
        title="YouTube video player"
        width={560}
      />
    </div>
  );
};
