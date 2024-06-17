'use client';
import { Suspense, useDeferredValue, useEffect } from 'react';
import { Page } from 'types/Page';
import { ServiceUrl } from 'utils';

import { styled } from 'styled-components';

import { LoadingWrapper, Meta, PageTitle } from 'components';
import SubjectMenu from 'components/common/Menu/SubjectMenu';
import StyledMain from 'components/common/StyledMain/StyledMain';
import TikTokItem from 'components/custom/TikTokItem/TikTokItem';
import { useAxios } from 'hooks/Axios';

type TikTokPageProps = {
  readonly title?: string;
};

const TikTokPage = ({ title }: TikTokPageProps): JSX.Element => {
  const tempId = 4000;
  //   id && id > 0 ? id : routeParams.id ? parseInt(routeParams.id, 10) : 0;
  const { data, isLoading, error, fetchData } = useAxios<Page>();
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    if (tempId) {
      fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${tempId}`);
    }
  }, [fetchData, tempId ]);

  const pageTitle = deferredData?.name ?? title;
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
            <StyledSection>
              <Suspense fallback="Loading results ...">
                <TikTokItem />
              </Suspense>
            </StyledSection>
          </LoadingWrapper>
        </StyledMain.Article>
        <StyledMain.Aside>Aside</StyledMain.Aside>
      </StyledMain>
    </>
  );
};

export default TikTokPage;

const StyledSection = styled.section`
  pre {
    > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;
