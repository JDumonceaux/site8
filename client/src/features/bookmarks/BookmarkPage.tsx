import type { JSX } from 'react';

import Layout from '@features/layouts/Layout/Layout';
import LoadingWrapper from '@/components/core/loading/LoadingWrapper';
import Meta from '@/components/core/meta/Meta';
import PageTitle from '@/components/core/page-title/PageTitle';
import BookmarkList from './BookmarkList';
import useBookmarks from './useBookmarks';

const BookmarkPage = (): JSX.Element => {
  const title = 'Bookmarks';
  const { data, error, isError, isLoading } = useBookmarks();

  if (isError && error) {
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
