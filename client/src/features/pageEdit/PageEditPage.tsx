import { useActionState } from 'react';
import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import Layout from 'features/layouts/Layout/Layout';
import { getParamIdAsString } from 'lib/utils/helpers';
import { useParams } from 'react-router-dom';
import usePage from './usePage';
import usePagePatch from './usePagePatch';
import PageEditForm from './PageEditForm';

const PageEditPage = (): React.JSX.Element => {
  const title = 'New Page';

  const { id } = useParams();
  const currentId = getParamIdAsString(id);

  const { data, error, isError, isLoading } = usePage(currentId);

  const { submitAction, isUpdating } = usePagePatch();

  const [state, formAction] = useActionState(submitAction, undefined);

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
