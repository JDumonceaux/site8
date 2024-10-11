import LoadingWrapper from 'components/core/Loading/LoadingWrapper';

import Meta from 'components/core/Meta/Meta';
import { BookmarkTags } from 'components/pages/BookmarkPage/BookmarksTags';
import PageTitle from 'components/core/PageTitle/PageTitle';
import { useAxios } from 'hooks/Axios/useAxios';
import { ServiceUrl } from 'lib/utils/constants';
import { useDeferredValue, useEffect } from 'react';
import { BookmarksTags } from 'types';

const BookmarkPage = (): JSX.Element => {
  const title = 'Bookmarks';
  const { data, error, fetchData, isLoading } = useAxios<BookmarksTags>();

  useEffect(() => {
    fetchData(`${ServiceUrl.ENDPOINT_BOOKMARKS}`);
  }, [fetchData]);

  const deferredData = useDeferredValue(data);

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <PageTitle title={title} />
        <section>
          <p>These are some of my favorite resources.</p>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <BookmarkTags data={deferredData} />
          </LoadingWrapper>
        </section>
      </Layout.Main>
    </>
  );
};

export default BookmarkPage;
