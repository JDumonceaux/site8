import { LoadingWrapper } from 'components/common/Loading';
import { PageTitle } from 'components/common/PageTitle';
import { Meta } from 'components/common/Meta';

import { useDeferredValue, useEffect } from 'react';
import usePhotos from 'services/hooks/usePhotos';
import StyledMain from 'components/common/StyledMain';

const PhotoPage = (): JSX.Element => {
  const { data, isLoading, error, fetchData } = usePhotos();
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Meta title="Photos" />
      <StyledMain>
        <PageTitle title="Photos" />
        <StyledMain.Article>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <ul>
              {deferredData?.items?.map((item) => {
                return (
                  <li key={item.id}>
                    <a
                      data-caption={item.description}
                      data-fancybox
                      href={item.url}>
                      <img
                        alt={item.description}
                        loading="lazy"
                        src={item.url}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </LoadingWrapper>
        </StyledMain.Article>
      </StyledMain>
    </>
  );
};

export default PhotoPage;
