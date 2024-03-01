import { LoadingWrapper } from 'components/common/Loading';
import { PageTitle } from 'components/common/PageTitle';
import { Meta } from 'components/common/Meta';

import { useDeferredValue, useEffect } from 'react';
import usePhotos from 'services/hooks/usePhotos';
import { APP_NAME } from 'utils/constants';
import { styled } from 'styled-components';

export const PhotoPage = (): JSX.Element => {
  const title = `${APP_NAME} - photos`;
  const { data, loading, error, fetchData } = usePhotos();
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <PageTitle title={title} />
        <StyledSection>
          <LoadingWrapper error={error} isLoading={loading}>
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
        </StyledSection>
      </StyledMain>
    </>
  );
};

export default PhotoPage;

const StyledMain = styled.main`
  background-color: #000;
  background-size: contain;
  min-height: 100vh;
  min-height: 100dvh;
`;
const StyledSection = styled.section``;
