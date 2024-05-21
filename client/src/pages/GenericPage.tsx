'use client';

import { Meta, LoadingWrapper, PageTitle, RenderHtml } from 'components';
import SubjectMenu from 'components/common/Menu/SubjectMenu';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { useAxios } from 'hooks/Axios';
import { useDeferredValue, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Page } from 'services/types';
import { styled } from 'styled-components';
import { ServiceUrl } from 'utils';

type GenericPageProps = {
  readonly id?: string | number;
  readonly title?: string;
};

const GenericPage = ({ id, title }: GenericPageProps): JSX.Element => {
  const x = useLocation();
  const tempId = id ? id : x.pathname.split('/').slice(-1);

  const { data, isLoading, error, fetchData } = useAxios<Page>();
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${tempId}`);
  }, []);

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
