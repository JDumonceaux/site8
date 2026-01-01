import type { JSX } from 'react';

import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import Layout from '@features/layouts/layout/Layout';
import { logError } from '@lib/utils/errorHandler';
import BookmarkList from './BookmarkList';
import useBookmarks from './useBookmarks';

const BookmarkPage = (): JSX.Element => {
  const title = 'Bookmarks';
  const { data, error, isError, isLoading } = useBookmarks();

  if (isError && error) {
    logError(error, { componentName: 'BookmarkPage', action: 'loadBookmarks' });
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
