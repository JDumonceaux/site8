import { Suspense, useDeferredValue, useEffect } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'components/layouts/Layout/Layout';
import SubjectMenu from 'features/generic/SubjectMenu';
import { useAxios } from 'hooks/Axios/useAxios';
import { ServiceUrl } from 'lib/utils/constants';
import { styled } from 'styled-components';
import type { Page } from 'types/Page';

type TikTokPageProps = {
  readonly title?: string;
};

const TikTokPage = ({ title }: TikTokPageProps): React.JSX.Element => {
  const tempId = 4000;
  //   id && id > 0 ? id : routeParams.id ? parseInt(routeParams.id, 10) : 0;
  const { data, error, fetchData, isLoading } = useAxios<Page>();
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${tempId}`);
  }, [fetchData]);

  const pageTitle = deferredData?.name ?? title;
  return (
    <>
      <Meta title={pageTitle} />
      <Layout.Main>
        <Layout.Menu>
          <SubjectMenu />
        </Layout.Menu>
        <Layout.Article>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <PageTitle title={pageTitle} />
            <StyledSection>
              <Suspense fallback="Loading results ..." />
            </StyledSection>
          </LoadingWrapper>
        </Layout.Article>
        <Layout.Aside>Aside</Layout.Aside>
      </Layout.Main>
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
