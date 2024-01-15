import { useEffect } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import PageTitle from "../../components/common/PageTitle/PageTitle";
import TwoColumn from "../Layouts/TwoColumn/TwoColumn";
import useMusic from "../../services/hooks/useMusic";
import { APP_NAME } from "../../utils/constants";

import LoadingWrapper from "../../components/common/LoadingWrapper";

import { IMusicItem } from "../../services/api/models/music/IMusicItem";
import memoize from "memoize-one";

function ItemRenderer({ data, index, style }: ListChildComponentProps) {
  const item = data.items[index] as IMusicItem;
  return (
    <div style={style} key={index}>
      <div>{item.description}</div>
      <iframe
        width={560}
        height={200}
        src={item.url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
}

export default function Example1() {
  const pageTitle = "YouTube Videos";
  const { data, loading, error, fetchData } = useMusic();

  useEffect(() => {
    document.title = `${APP_NAME} - ${pageTitle}`;
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize the data
  const createItemData = memoize((items: IMusicItem[]) => ({
    items,
  }));

  const itemData = data?.items ? createItemData(data?.items) : undefined;

  return (
    <TwoColumn
      pageTitle={<PageTitle title={pageTitle} />}
      left={
        <section className="section">
          <p>These are some of my favorite YouTube videos.</p>
          <LoadingWrapper isLoading={loading} error={error}>
            <List
              height={600}
              itemCount={data?.items?.length ? data?.items?.length : 0}
              itemSize={220}
              itemData={itemData}
              overscanCount={15}
              width="100%"
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
      }
      right={
        <aside className="right-column">
          <br />
        </aside>
      }
    />
  );
}
