'use client';
import { Meta, PageTitle, LoadingWrapper } from 'components';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { BookmarkTags } from 'components/custom/BookmarksTags';
import { useAxios } from 'hooks/Axios';
import { useDeferredValue, useEffect } from 'react';
import { BookmarksTags } from 'types';
import { ServiceUrl } from 'utils';

const BookmarkPage = (): JSX.Element => {
  const title = 'Bookmarks';
  const { data, error, isLoading, fetchData } = useAxios<BookmarksTags>();
  useEffect(() => {
    fetchData(`${ServiceUrl.ENDPOINT_BOOKMARKS}`);
  }, []);

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
