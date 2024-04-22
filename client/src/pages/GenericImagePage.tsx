'use client';
import { Suspense, useDeferredValue } from 'react';

import { LoadingWrapper, Meta, PageTitle, RenderHtml } from 'components';
import StyledMain from 'components/common/StyledMain/StyledMain';
import SubjectMenu from 'components/common/Menu/SubjectMenu';
import { styled } from 'styled-components';
import { useQuery, gql } from '@apollo/client';

const IMAGE_QUERY = gql`
  {
    launchesPast(limit: 10) {
      id
      mission_name
    }
  }
`;

const GenericImagePage = (): JSX.Element => {
  // const routeParams = useParams<{
  //   id: string;
  // }>();

  //const tempId = routeParams.id;

  const { data, loading, error } = useQuery(IMAGE_QUERY);

  const deferredData = useDeferredValue(data);

  const pageTitle = deferredData?.name;

  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <Meta title={pageTitle} />
      <StyledMain>
        <StyledMain.Menu>
          <SubjectMenu />
        </StyledMain.Menu>
        <StyledMain.Article>
          <LoadingWrapper error={error} isLoading={loading}>
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

export default GenericImagePage;

const StyledSection = styled.section`
  pre {
    > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;
