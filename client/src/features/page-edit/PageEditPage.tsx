import type { JSX } from 'react';
import { useParams } from 'react-router-dom';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import StyledLink from '@components/ui/link/styled-link/StyledLink';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import Layout from '@features/layouts/layout/Layout';
import { isEmpty } from '@lib/utils/boolean-checks';
import { parseId } from '@site8/shared';
import PageEditForm from './PageEditForm';
import usePage from './usePage';

const PageEditPage = (): JSX.Element => {
  const { id } = useParams();
  const parsedId = parseId(id);
  const currentId = parsedId.isValid ? String(parsedId.id) : '';
  const title = isEmpty(currentId) ? 'New Page' : `Edit Page: ${currentId}`;

  const { data, error, isError, isLoading } = usePage(currentId);

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <Layout.Section>
          <PageTitle title={title}>
            <StyledLink
              data-testid="nav-list"
              to="/admin/pages"
            >
              List
            </StyledLink>
            <StyledLink
              data-testid="nav-new"
              to="/admin/page/edit"
            >
              New
            </StyledLink>
          </PageTitle>
          <LoadingWrapper
            error={error}
            isError={isError}
            isLoading={isLoading}
          >
            <PageEditForm data={data} />
          </LoadingWrapper>
        </Layout.Section>
      </Layout.Main>
    </>
  );
};

export default PageEditPage;
