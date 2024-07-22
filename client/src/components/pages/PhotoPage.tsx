import LoadingWrapper from 'components/common/Loading/LoadingWrapper';
import Meta from 'components/common/Meta/Meta';
import PageTitle from 'components/common/PageTitle/PageTitle';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { useAxios } from 'hooks/Axios';
import { useDeferredValue, useEffect } from 'react';
import { Photos } from 'types';
import { ServiceUrl } from 'utils/constants';

const PhotoPage = (): JSX.Element => {
  const { data, isLoading, error, fetchData } = useAxios<Photos>();
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    fetchData(`${ServiceUrl.ENDPOINT_PHOTOS}`);
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
