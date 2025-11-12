import { type JSX, useDeferredValue } from 'react';
import { Link as BaseLink, useLocation } from 'react-router-dom';

import LoadingWrapper from '@components/core/loading/LoadingWrapper';
import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page-title/PageTitle';
import Layout from '@features/layouts/Layout/Layout';
import styled from 'styled-components';
import RenderHtml from './RenderHtml';
import SubjectMenu from './SubjectMenu';
import useGenericPage from './useGenericPage';

type GenericPageProps = {
  readonly title?: string;
};

const GenericPage = ({ title }: GenericPageProps): JSX.Element => {
  const x = useLocation();

  const { data, error, isError, isLoading } = useGenericPage(
    x.pathname ? x.pathname.slice(1) : undefined,
  );

  const deferredData = useDeferredValue(data);

  const pageTitle = deferredData?.name ?? title;

  return (
    <>
      <Meta title={pageTitle} />
      <Layout.Main>
        <Layout.Menu>
          <SubjectMenu />
        </Layout.Menu>
        <Layout.Content>
          <LoadingWrapper
            error={error}
            isError={isError}
            isLoading={isLoading}
            loadingText="Loading ..."
          >
            <Layout.Article>
              <PageTitle title={pageTitle}>
                <BaseLink to={`/admin/page/edit/${data?.id}`}>Edit</BaseLink>
              </PageTitle>
              <StyledSection>
                <RenderHtml text={deferredData?.text} />
              </StyledSection>
            </Layout.Article>
          </LoadingWrapper>
          <Layout.Aside />
        </Layout.Content>
      </Layout.Main>
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
