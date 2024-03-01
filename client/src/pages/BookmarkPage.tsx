import { LoadingWrapper } from 'components/common/Loading';
import { PageTitle } from 'components/common/PageTitle';
import { BookmarkList } from 'components/common/BookmarkList';
import { Meta } from 'components/common/Meta';
import { useDeferredValue, useEffect } from 'react';
import useBookmarks from 'services/hooks/useBookmarks';
import { APP_NAME } from 'utils/constants';

export const BookmarkPage = (): JSX.Element => {
  const title = 'Bookmarks';
  const { data, error, loading, fetchData } = useBookmarks();
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Meta title={title} />
      <main className="main-content">
        <PageTitle title={title} />
        <section className="section">
          <p>These are some of my favorite resources.</p>

          <LoadingWrapper error={error} isLoading={loading}>
            <BookmarkList data={deferredData} />
          </LoadingWrapper>
        </section>
      </main>
      <aside className="right-sidebar" />
    </>
  );
};

export default BookmarkPage;
