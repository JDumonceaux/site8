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
import { SubjectMenu } from 'components/common/Menu/MainMenu/SubjectMenu/SubjectMenu';
import { styled } from 'styled-components';

type GenericPageProps = {
  readonly id?: number;
  readonly title?: string;
};

export const GenericPage = ({ id, title }: GenericPageProps): JSX.Element => {
  const routeParams = useParams<{
    id: string;
    title: string;
  }>();

  const tempId =
    id && id > 0 ? id : routeParams.id ? parseInt(routeParams.id, 10) : 0;
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
          <SubjectMenu id={5} />
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
        <StyledMain.Aside>Aside</StyledMain.Aside>
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
