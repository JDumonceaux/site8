import { LoadingWrapper } from 'components/common/Loading';
import { PageTitle } from 'components/common/PageTitle';
import { Meta } from 'components/common/Meta';
import { useDeferredValue } from 'react';

import { BookmarkTags } from 'components/custom/BookmarksTags';
import StyledMain from 'components/common/StyledMain';
import { useAxios } from 'hooks/Axios';
import { BookmarksTags } from 'services/types';
import { ServiceUrl } from 'utils';

const BookmarkPage = (): JSX.Element => {
  const title = 'Bookmarks';
  const { data, error, isLoading } = useAxios<BookmarksTags>(
    `${ServiceUrl.ENDPOINT_BOOKMARKS}`,
  );
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
