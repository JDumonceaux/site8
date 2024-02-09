import './musicList.css';

import { LoadingWrapper, PageTitle, SEO } from 'components/common';
import memoize from 'memoize-one';
import { useDeferredValue, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import type { ListChildComponentProps } from 'react-window';
import { IMusicItem } from 'services/api/models/music/IMusicItem';
import useMusic from 'services/hooks/useMusic';

function ItemRenderer({ data, index, style }: ListChildComponentProps) {
  const item = data.items[index] as IMusicItem;
  return (
    <div
      style={style}
      key={index}>
      <div>{item.description}</div>
      <iframe
        width={560}
        height={200}
        src={item.url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
    </div>
  );
}

export default function MusicList(): JSX.Element {
  const title = 'YouTube Videos';
  const { data, loading, error, fetchData } = useMusic();

  const deferredData = useDeferredValue(data);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize the data
  const createItemData = memoize((items: IMusicItem[]) => ({
    items,
  }));

  const itemData = deferredData?.items
    ? createItemData(deferredData?.items)
    : undefined;

  return (
    <>
      <SEO title={title} />
      <main className="main-content">
        <PageTitle title={title} />
        <section className="section">
          <p>These are some of my favorite YouTube videos.</p>
          <LoadingWrapper
            isLoading={loading}
            error={error}>
            <List
              height={600}
              itemCount={data?.items?.length ? data?.items?.length : 0}
              itemSize={220}
              itemData={itemData}
              overscanCount={15}
              width="100%">
              {ItemRenderer}
            </List>

            {/* {data?.items?.map((item) => (
                <div key={item.id}>
                  <div>{item.description}</div>
                  <iframe
                    width={560}
                    height={200}
                    src={item.url}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                </div>
              ))} */}
          </LoadingWrapper>
        </section>
      </main>
      <aside className="right-sidebar"></aside>
    </>
  );
}
