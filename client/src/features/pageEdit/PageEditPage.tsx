import type { JSX } from 'react';
import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import Layout from 'features/layouts/Layout/Layout';
import { getParamIdAsString } from 'lib/utils/helpers';
import { useParams } from 'react-router-dom';

import PageEditForm from './PageEditForm';
import usePage from './usePage';
const PageEditPage = (): JSX.Element => {
  const { id } = useParams();
  const currentId = getParamIdAsString(id);
  const title = currentId ? `Edit Page: ${currentId}` : 'New Page';

  const { data, error, isError, isLoading } = usePage(currentId);

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <Layout.Section>
          <PageTitle title={title}>
            <StyledLink data-testid="nav-list" to="/admin/pages">
              List
            </StyledLink>
            <StyledLink data-testid="nav-new" to="/admin/page/edit">
              New
            </StyledLink>
          </PageTitle>
          <LoadingWrapper error={error} isError={isError} isLoading={isLoading}>
            <PageEditForm data={data} />
          </LoadingWrapper>
        </Layout.Section>
      </Layout.Main>
    </>
  );
};

export default PageEditPage;
