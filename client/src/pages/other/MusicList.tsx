import { useEffect } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import PageTitle from '../../components/common/PageTitle/PageTitle';
import useMusic from '../../services/hooks/useMusic';
import LoadingWrapper from '../../components/common/Loading/LoadingWrapper';

import { IMusicItem } from '../../services/api/models/music/IMusicItem';
import memoize from 'memoize-one';
import SEO from '../../components/common/SEO/SEO';

import './musicList.css';

function ItemRenderer({ data, index, style }: ListChildComponentProps) {
  const item = data.items[index] as IMusicItem;
  return (
    <div style={style} key={index}>
      <div>{item.description}</div>
      <iframe
        width={560}
        height={200}
        src={item.url}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      ></iframe>
    </div>
  );
}

export default function MusicList() {
  const title = 'YouTube Videos';
  const { data, loading, error, fetchData } = useMusic();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize the data
  const createItemData = memoize((items: IMusicItem[]) => ({
    items,
  }));

  const itemData = data?.items ? createItemData(data?.items) : undefined;

  return (
    <>
      <SEO title={title} />
      <main className='main-content'>
        <PageTitle title={title} />
        <section className='section'>
          <p>These are some of my favorite YouTube videos.</p>
          <LoadingWrapper isLoading={loading} error={error}>
            <List
              height={600}
              itemCount={data?.items?.length ? data?.items?.length : 0}
              itemSize={220}
              itemData={itemData}
              overscanCount={15}
              width='100%'
            >
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
      <aside className='right-sidebar'></aside>
    </>
  );
}
