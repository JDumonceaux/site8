import { LoadingWrapper } from 'components/common/Loading';
import { PageTitle } from 'components/common/PageTitle';
import { Meta } from 'components/common/Meta';
import { useDeferredValue } from 'react';
import useBookmarks from 'services/hooks/useBookmarks';
import { BookmarkTags } from 'components/common/BookmarksTags';
import StyledMain from 'components/common/StyledMain';

const BookmarkPage = (): JSX.Element => {
  const title = 'Bookmarks';
  const { data, error, isLoading } = useBookmarks();
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
