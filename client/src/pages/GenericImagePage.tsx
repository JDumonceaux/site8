'use client';
import { Suspense, useDeferredValue, useEffect } from 'react';
import { styled } from 'styled-components';

import { LoadingWrapper, Meta, PageTitle } from 'components';
import SubjectMenu from 'components/common/Menu/SubjectMenu';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { useAxios } from 'hooks/Axios';
import { Image } from 'types/Image';
import { Images } from 'types/Images';
import { ServiceUrl } from 'utils';

const GenericImagePage = (): JSX.Element => {
  const { data, isLoading, error, fetchData } = useAxios<Images>();

  const deferredData = useDeferredValue<Image[]>(data ? data.items : []);

  useEffect(() => {
    fetchData(`${ServiceUrl.ENDPOINT_IMAGES}`);
  }, [fetchData]);

  const pageTitle = 'Images';
  const imagePath = '/images/like/';

  if (error) return <pre>{error}</pre>;

  return (
    <>
      <Meta title={pageTitle} />
      <StyledMain>
        <StyledMain.Menu>
          <SubjectMenu />
        </StyledMain.Menu>
        <StyledMain.Article>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <PageTitle title={pageTitle} />
            <StyledMain.Section>
              <Suspense fallback="Loading results ...">
                {deferredData?.map((item, index) => (
                  <div key={index}>
                    <StyledImage
                      alt={item.name}
                      src={`${imagePath}${item.src}`}
                    />
                    <div>{item.name}</div>
                    <div>
                      <a href={`${item.name}`}>Offical Site</a>
                    </div>
                    <div>{item.tags}</div>
                  </div>
                ))}
              </Suspense>
            </StyledMain.Section>
          </LoadingWrapper>
        </StyledMain.Article>
        <StyledMain.Aside />
      </StyledMain>
    </>
  );
};

export default GenericImagePage;

const StyledImage = styled.img`
  height: 200px;
  width: 200px;
`;
