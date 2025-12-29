import { type JSX, useDeferredValue } from 'react';
import { Link as BaseLink, useLocation } from 'react-router-dom';

import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import Layout from '@features/layouts/layout/Layout';
import type { Page } from '@site8/shared';
import RenderHtml from './RenderHtml';
import SubjectMenu from './SubjectMenu';
import useGenericPage from './useGenericPage';
import styled from 'styled-components';

type GenericPageProps = {
  readonly title?: string;
};

const GenericPage = ({ title }: GenericPageProps): JSX.Element => {
  const x = useLocation();

  const query = useGenericPage(x.pathname.slice(1));

  const pageData: Page | undefined =
    query.isSuccess && query.data ? query.data : undefined;
  const deferredData = useDeferredValue(pageData);

  const pageTitle: string = deferredData?.title ?? title ?? '';

  return (
    <>
      <Meta title={pageTitle} />
      <Layout.TwoColumn>
        <Layout.Menu>
          <SubjectMenu />
        </Layout.Menu>
        <Layout.Content>
          <LoadingWrapper
            error={query.error ?? null}
            isError={query.isError}
            isLoading={query.isLoading}
            loadingText="Loading ..."
          >
            <Layout.Article>
              <PageTitle title={pageTitle}>
                <BaseLink
                  to={`/admin/page/edit/${pageData?.id ? String(pageData.id) : ''}`}
                >
                  Edit
                </BaseLink>
              </PageTitle>
              <StyledSection>
                <RenderHtml text={deferredData?.text ?? undefined} />
              </StyledSection>
            </Layout.Article>
          </LoadingWrapper>
          <Layout.Aside />
        </Layout.Content>
      </Layout.TwoColumn>
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
