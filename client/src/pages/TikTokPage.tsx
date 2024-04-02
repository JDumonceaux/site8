'use client';
import { Suspense, useDeferredValue } from 'react';
import { ServiceUrl } from 'utils';
import { Page } from 'services/types/Page';
import useFetch from 'services/hooks/useFetch';
import { PageTitle } from 'components/common/PageTitle';
import { LoadingWrapper } from 'components/common/Loading';
import { Meta } from 'components/common/Meta';

import StyledMain from 'components/common/StyledMain';

import { styled } from 'styled-components';
import TikTokItem from 'components/common/TikTokItem';
import SubjectMenu from 'components/common/Menu/MainMenu/SubjectMenu/SubjectMenu';

type TikTokPageProps = {
  readonly title?: string;
};

const TikTokPage = ({ title }: TikTokPageProps): JSX.Element => {
  const tempId = 4000;
  //   id && id > 0 ? id : routeParams.id ? parseInt(routeParams.id, 10) : 0;
  const { data, isLoading, error } = useFetch<Page>(
    tempId && tempId > 0 ? `${ServiceUrl.ENDPOINT_PAGE}/${tempId}` : undefined,
  );

  const deferredData = useDeferredValue(data);

  const pageTitle = deferredData?.long_title ?? title;
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
