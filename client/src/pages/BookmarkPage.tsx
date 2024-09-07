import LoadingWrapper from 'components/common/Loading/LoadingWrapper';
import StyledMain from 'components/common/StyledMain/StyledMain';
import Meta from 'components/Meta/Meta';
import { BookmarkTags } from 'components/pages/BookmarkPage/BookmarksTags';
import PageTitle from 'components/PageTitle/PageTitle';
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
      <StyledMain>
        <PageTitle title={title} />
        <section>
          <p>These are some of my favorite resources.</p>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <BookmarkTags data={deferredData} />
          </LoadingWrapper>
        </section>
      </StyledMain>
    </>
  );
};

export default BookmarkPage;
