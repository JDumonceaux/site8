import LoadingWrapper from 'components/common/Loading/LoadingWrapper';
import StyledMain from 'components/common/StyledMain/StyledMain';
import Meta from 'components/ui/Meta/Meta';
import PageTitle from 'components/ui/PageTitle/PageTitle';
import { useAxios } from 'hooks/Axios';
import { ServiceUrl } from 'lib/utils/constants';
import { useDeferredValue, useEffect } from 'react';
import { Photos } from 'types';

const PhotoPage = (): JSX.Element => {
  const { data, error, fetchData, isLoading } = useAxios<Photos>();
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
