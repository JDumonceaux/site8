import LoadingWrapper from 'components/common/Loading/LoadingWrapper';
import StyledMain from 'components/common/StyledMain/StyledMain';
import StyledLink from 'components/ui/Link/StyledLink/StyledLink';
import Meta from 'components/ui/Meta/Meta';
import PageTitle from 'components/ui/PageTitle/PageTitle';
import { useAxios } from 'hooks/Axios';
import { ServiceUrl } from 'lib/utils/constants';
import { getParamIdAsString } from 'lib/utils/helpers';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from 'types';
import PageEditForm from './PageEditForm';

const PageEditPage = (): JSX.Element => {
  const { id } = useParams();
  const { data, isLoading, error, fetchData } = useAxios<Page>();
  const currentId = getParamIdAsString(id);

  useEffect(() => {
    if (currentId) {
      fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${currentId}`);
    }
  }, [currentId, fetchData]);

  const title = 'New Page';

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <StyledMain.Section>
          <PageTitle title={title}>
            <div>
              <StyledLink data-testid="nav-list" to="/admin/pages">
                List
              </StyledLink>
            </div>
            <div>
              <StyledLink data-testid="nav-new" to="/admin/page/edit">
                New
              </StyledLink>
            </div>
          </PageTitle>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <PageEditForm data={data} />
          </LoadingWrapper>
        </StyledMain.Section>
      </StyledMain>
    </>
  );
};

export default PageEditPage;
