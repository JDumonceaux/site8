'use client';

import { Meta, LoadingWrapper, PageTitle, RenderHtml } from 'components';
import Fallback from 'components/common/Fallback/Fallback';
import SubjectMenu from 'components/common/Menu/SubjectMenu';
import StyledMain from 'components/common/StyledMain/StyledMain';
import StyledMenu from 'components/common/StyledMain/StyledMenu';
import { useAxios } from 'hooks/Axios';
import {
  useDeferredValue,
  Suspense,
  useEffect,
  useState,
  Profiler,
} from 'react';
import { useLocation, Link as BaseLink } from 'react-router-dom';
import { Page } from 'types';
import { styled } from 'styled-components';
import { ServiceUrl } from 'utils';

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

  console.log('id', id);

  useEffect(() => {
    if (id) {
      fetchData(`${ServiceUrl.ENDPOINT_PAGE_NAME}/${id}`);
    }
  }, [id]);

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
                <StyledMenu>
                  <li>
                    <BaseLink to={`/admin/page/edit/${data?.id}`}>
                      Edit
                    </BaseLink>
                  </li>
                </StyledMenu>
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
