import Fallback from 'components/common/Fallback/Fallback';
import LoadingWrapper from 'components/common/Loading/LoadingWrapper';
import StyledMain from 'components/common/StyledMain/StyledMain';
import RenderHtml from 'components/pages/GenericPage/RenderHtml';
import SubjectMenu from 'components/pages/GenericPage/SubjectMenu';
import Meta from 'components/ui/Meta/Meta';
import PageTitle from 'components/ui/PageTitle/PageTitle';
import { useAxios } from 'hooks/Axios';
import { ServiceUrl } from 'lib/utils/constants';
import { Suspense, useDeferredValue, useEffect, useState } from 'react';
import { Link as BaseLink, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { Page } from 'types';

type GenericPageProps = {
  readonly title?: string;
};

const GenericPage = ({ title }: GenericPageProps): JSX.Element => {
  const x = useLocation();
  const [id, setId] = useState<string | undefined>(undefined);
  const { data, isLoading, error, fetchData } = useAxios<Page>();
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    const arr = x.pathname.split('/');
    const tempId = arr[arr.length - 1];
    setId(tempId);
  }, [x.pathname]);

  useEffect(() => {
    if (id) {
      fetchData(`${ServiceUrl.ENDPOINT_PAGE_NAME}/${id}`);
    }
  }, [fetchData, id]);

  const pageTitle = deferredData?.name ?? title;

  return (
    <>
      <Meta title={pageTitle} />
      <StyledMain>
        <StyledMain.Menu>
          <SubjectMenu />
        </StyledMain.Menu>
        <LoadingWrapper
          error={error}
          fallback={<Fallback />}
          isLoading={isLoading}>
          <Suspense fallback="Loading ...">
            <StyledMain.Article>
              <PageTitle title={pageTitle}>
                <BaseLink to={`/admin/page/edit/${data?.id}`}>Edit</BaseLink>
              </PageTitle>
              <StyledSection>
                <RenderHtml text={deferredData?.text} />
              </StyledSection>
            </StyledMain.Article>
          </Suspense>
        </LoadingWrapper>
        <StyledMain.Aside />
      </StyledMain>
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
