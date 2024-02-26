import type { ListChildComponentProps } from 'react-window';
import { IMusicItem } from 'services/api/models/music/IMusicItem';

export const ItemRenderer = ({
  data,
  index,
  style,
}: ListChildComponentProps) => {
  const item = data.items[index] as IMusicItem;
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
