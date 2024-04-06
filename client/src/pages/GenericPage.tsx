'use client';
import { Suspense, useDeferredValue } from 'react';
import { ServiceUrl } from 'utils';
import { Page } from 'services/types/Page';
import useFetch from 'services/hooks/useFetch';
import { PageTitle } from 'components/common/PageTitle';
import { LoadingWrapper } from 'components/common/Loading';
import { Meta } from 'components/common/Meta';
import { useParams } from 'react-router-dom';

import RenderHtml from 'components/common/RenderHtml';
import StyledMain from 'components/common/StyledMain';
import SubjectMenu from 'components/common/Menu/MainMenu/SubjectMenu/SubjectMenu';
import { styled } from 'styled-components';

type GenericPageProps = {
  readonly id?: string | number;
  readonly title?: string;
};

const GenericPage = ({ id, title }: GenericPageProps): JSX.Element => {
  const routeParams = useParams<{
    id: string;
  }>();

  const tempId = id ? id : routeParams.id;

  const { data, isLoading, error } = useFetch<Page>(
    `${ServiceUrl.ENDPOINT_PAGE}/${tempId}`,
  );

  const deferredData = useDeferredValue(data);

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
                <RenderHtml text={deferredData?.text} />
              </Suspense>
            </StyledSection>
          </LoadingWrapper>
        </StyledMain.Article>
        <StyledMain.Aside />
      </StyledMain>
    </>
  );
};

export default GenericPage;

const StyledSection = styled.section`
  pre {
    > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;
