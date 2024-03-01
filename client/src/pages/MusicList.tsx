import { LoadingWrapper } from 'components/common/Loading';
import { PageTitle } from 'components/common/PageTitle';
import { Meta } from 'components/common/Meta';
import './musicList.css';

import memoize from 'memoize-one';
import { useDeferredValue, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { MusicItem } from 'services/types/MusicItem';
import useMusic from 'services/hooks/useMusic';
import { ItemRenderer } from './ItemRenderer';

export const MusicList = (): JSX.Element => {
  const title = 'YouTube Videos';
  const { data, loading, error, fetchData } = useMusic();

  const deferredData = useDeferredValue(data);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize the data
  const createItemData = memoize((items: MusicItem[]) => ({
    items,
  }));

  const itemData = deferredData?.items
    ? createItemData(deferredData?.items)
    : undefined;

  return (
    <>
      <Meta title={title} />
      <main className="main-content">
        <PageTitle title={title} />
        <section className="section">
          <p>These are some of my favorite YouTube videos.</p>
          <LoadingWrapper error={error} isLoading={loading}>
            <List
              height={600}
              itemCount={data?.items?.length ? data?.items?.length : 0}
              itemData={itemData}
              itemSize={220}
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
      <aside className="right-sidebar" />
    </>
  );
};

export default MusicList;
