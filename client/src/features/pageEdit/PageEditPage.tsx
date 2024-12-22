import { useEffect } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'components/layouts/Layout/Layout';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import { useAxios } from 'hooks/Axios/useAxios';
import { ServiceUrl } from 'lib/utils/constants';
import { getParamIdAsString } from 'lib/utils/helpers';
import { useParams } from 'react-router-dom';
import type { Page } from 'types';

import PageEditForm from './PageEditForm';

const PageEditPage = (): React.JSX.Element => {
  const { id } = useParams();
  const { data, error, fetchData, isLoading } = useAxios<Page>();
  const currentId = getParamIdAsString(id);

  useEffect(() => {
    if (!currentId) {
      return;
    }
    fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${currentId}`);
  }, [currentId]);

  const title = 'New Page';

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
          <LoadingWrapper error={error} isLoading={isLoading}>
            <PageEditForm data={data} />
          </LoadingWrapper>
        </Layout.Section>
      </Layout.Main>
    </>
  );
};

export default PageEditPage;
