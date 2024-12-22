import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'components/layouts/Layout/Layout';

import { BookmarkList } from './BookmarkList';
import useBookmarks from './useBookmarks';

const BookmarkPage = (): React.JSX.Element => {
  const title = 'Bookmarks';
  const { data, error, isLoading } = useBookmarks();

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <PageTitle title={title} />
        <section>
          <p>These are some of my favorite resources.</p>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <BookmarkList data={data} />
          </LoadingWrapper>
        </section>
      </Layout.Main>
    </>
  );
};

export default BookmarkPage;
