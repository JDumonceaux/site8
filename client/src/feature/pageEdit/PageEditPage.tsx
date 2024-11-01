import LoadingWrapper from 'components/core/Loading/LoadingWrapper';

import StyledLink from 'components/Link/StyledLink/StyledLink';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import { useFetch } from 'hooks/Axios/useFetch';
import { ServiceUrl } from 'lib/utils/constants';
import { getParamIdAsString } from 'lib/utils/helpers';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from 'types';

import PageEditForm from '../components/pages/PageEditPage/PageEditForm';
import Layout from 'components/layouts/Layout/Layout';

const PageEditPage = (): JSX.Element => {
  const { id } = useParams();
  const { clearData, data, error, fetchData, isLoading } = useFetch<Page>();
  const currentId = getParamIdAsString(id);

  useEffect(() => {
    if (!currentId) {
      clearData();
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
