import { type JSX, useDeferredValue } from 'react';
import { Link as BaseLink, useLocation } from 'react-router-dom';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import Layout from '@features/layouts/layout/Layout';
import useMenu from '@features/menu/useMenu';
import type { MenuItem, Page } from '@site8/shared';
import RenderHtml from './RenderHtml';
import SubjectMenu from './SubjectMenu';
import useGenericPage from './useGenericPage';
import styled from 'styled-components';

type GenericPageProps = {
  readonly title?: string;
};

// Helper to recursively find menu item by URL segments
const findMenuItemByPath = (
  items: MenuItem[] | undefined,
  parentName: string,
  pageName: string,
): MenuItem | undefined => {
  if (!items) return undefined;

  // Find parent item
  const parent = items.find(
    (item) => item.title?.toLowerCase().replaceAll(/\s+/g, '-') === parentName,
  );

  if (!parent?.items) return undefined;

  // Find child item
  return parent.items.find(
    (item) => item.title?.toLowerCase().replaceAll(/\s+/g, '-') === pageName,
  );
};

const GenericPage = ({ title }: GenericPageProps): JSX.Element => {
  const x = useLocation();
  const { getRootMenuItems } = useMenu();

  // Extract URL segments: /programming/atomic-design -> ['programming', 'atomic-design']
  const pathParts = x.pathname.split('/').filter(Boolean);

  let pageId: string;

  if (pathParts.length >= 2) {
    // Two segments: parent/page - look up in menu
    const menuItem = findMenuItemByPath(
      getRootMenuItems(),
      pathParts[0],
      pathParts[1],
    );
    pageId = menuItem?.id ? String(menuItem.id) : pathParts.join('/');
  } else {
    // Single segment: just use it as-is
    pageId = x.pathname.slice(1);
  }

  const query = useGenericPage(pageId);

  console.log('query data in GenericPage:', pageId);

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
