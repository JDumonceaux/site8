import type { JSX } from 'react';
import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'features/layouts/Layout/Layout';

import BookmarkList from './BookmarkList';
import useBookmarks from './useBookmarks';

const BookmarkPage = (): JSX.Element => {
  const title = 'Bookmarks';
  const { data, error, isError, isLoading } = useBookmarks();

  if (isError && error) {
    // eslint-disable-next-line no-console
    console.error('BookmarkPage: Error loading bookmarks', error);
  }

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <PageTitle title={title} />
        <section>
          <p>These are some of my favorite resources.</p>
          <LoadingWrapper
            error={error}
            isError={isError}
            isLoading={isLoading}
          >
            <BookmarkList data={data} />
          </LoadingWrapper>
        </section>
      </Layout.Main>
    </>
  );
};

export default BookmarkPage;
