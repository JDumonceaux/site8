import { Suspense, useDeferredValue } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'components/layouts/Layout/Layout';
import SubjectMenu from 'features/generic/SubjectMenu';
import { styled } from 'styled-components';

import useTiktok from './useTiktok';

type TikTokPageProps = {
  readonly title?: string;
};

const TikTokPage = ({ title }: TikTokPageProps): React.JSX.Element => {
  const tempId = '4000';

  const { data, isError, isPending } = useTiktok(tempId);
  const deferredData = useDeferredValue(data);

  const pageTitle = deferredData?.name ?? title;
  return (
    <>
      <Meta title={pageTitle} />
      <Layout.Main>
        <Layout.Menu>
          <SubjectMenu />
        </Layout.Menu>
        <Layout.Article>
          <LoadingWrapper isError={isError} isPending={isPending}>
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
