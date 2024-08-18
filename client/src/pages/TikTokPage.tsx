import LoadingWrapper from 'components/common/Loading/LoadingWrapper';
import StyledMain from 'components/common/StyledMain/StyledMain';
import SubjectMenu from 'components/pages/GenericPage/SubjectMenu';
import Meta from 'components/ui/Meta/Meta';
import PageTitle from 'components/ui/PageTitle/PageTitle';
import { useAxios } from 'hooks/Axios';
import { ServiceUrl } from 'lib/utils/constants';
import { Suspense, useDeferredValue, useEffect } from 'react';
import { styled } from 'styled-components';
import { Page } from 'types/Page';

type TikTokPageProps = {
  readonly title?: string;
};

const TikTokPage = ({ title }: TikTokPageProps): JSX.Element => {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  const tempId = 4000;
  //   id && id > 0 ? id : routeParams.id ? parseInt(routeParams.id, 10) : 0;
  const { data, error, fetchData, isLoading } = useAxios<Page>();
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    if (tempId) {
      fetchData(`${ServiceUrl.ENDPOINT_PAGE}/${tempId}`);
    }
  }, [fetchData, tempId]);

  const pageTitle = deferredData?.name ?? title;
  return (
    <>
      <Meta title={pageTitle} />
      <StyledMain>
        <StyledMain.Menu>
          <SubjectMenu />
        </StyledMain.Menu>
        <StyledMain.Article>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <PageTitle title={pageTitle} />
            <StyledSection>
              <Suspense fallback="Loading results ..." />
            </StyledSection>
          </LoadingWrapper>
        </StyledMain.Article>
        <StyledMain.Aside>Aside</StyledMain.Aside>
      </StyledMain>
    </>
  );
};

export default TikTokPage;

const StyledSection = styled.section`
  pre {
    > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;
