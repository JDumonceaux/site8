import { Suspense, useDeferredValue, useEffect, useState } from 'react';

import Fallback from 'components/core/Fallback/Fallback';
import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'components/layouts/Layout/Layout';
import { useAxios } from 'hooks/Axios/useAxios';
import { ServiceUrl } from 'lib/utils/constants';
import { Link as BaseLink, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import type { Page } from 'types';

import RenderHtml from './RenderHtml';
import SubjectMenu from './SubjectMenu';

type GenericPageProps = {
  readonly title?: string;
};

const GenericPage = ({ title }: GenericPageProps): React.JSX.Element => {
  const x = useLocation();
  const [id, setId] = useState<string | undefined>();
  const { data, error, fetchData, isLoading } = useAxios<Page>();
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    const array = x.pathname.split('/');
    const temporaryId = array.at(-1);
    setId(temporaryId);
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
      <Layout.Main>
        <Layout.Menu>
          <SubjectMenu />
        </Layout.Menu>
        <LoadingWrapper
          error={error}
          fallback={<Fallback />}
          isLoading={isLoading}>
          <Suspense fallback="Loading ...">
            <Layout.Article>
              <PageTitle title={pageTitle}>
                <BaseLink to={`/admin/page/edit/${data?.id}`}>Edit</BaseLink>
              </PageTitle>
              <StyledSection>
                <RenderHtml text={deferredData?.text} />
              </StyledSection>
            </Layout.Article>
          </Suspense>
        </LoadingWrapper>
        <Layout.Aside />
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
