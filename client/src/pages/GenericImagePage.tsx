'use client';
import { styled } from 'styled-components';
import { Suspense, useDeferredValue } from 'react';

import { LoadingWrapper, Meta, PageTitle } from 'components';
import StyledMain from 'components/common/StyledMain/StyledMain';
import SubjectMenu from 'components/common/Menu/SubjectMenu';
import { useAxios } from 'hooks/Axios';
import { ServiceUrl } from 'utils';
import { Image } from 'services/types/Image';
import { Images } from 'services/types/Images';

const GenericImagePage = (): JSX.Element => {
  const { data, isLoading, error } = useAxios<Images>(
    `${ServiceUrl.ENDPOINT_IMAGES}`,
  );

  console.log('data', data);

  const deferredData = useDeferredValue<Image[]>(data ? data.items : []);

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
