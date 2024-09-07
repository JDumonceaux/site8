import LoadingWrapper from 'components/common/Loading/LoadingWrapper';
import StyledMain from 'components/common/StyledMain/StyledMain';
import Meta from 'components/Meta/Meta';
import SubjectMenu from 'components/pages/GenericPage/SubjectMenu';
import PageTitle from 'components/PageTitle/PageTitle';
import { useAxios } from 'hooks/Axios/useAxios';
import { ServiceUrl } from 'lib/utils/constants';
import { Suspense, useEffect } from 'react';
import { styled } from 'styled-components';
import { Tests } from 'types/Tests';

const TestsPage = (): JSX.Element => {
  const { data, error, fetchData, isLoading } = useAxios<Tests>();

  const pageTitle = 'Tests';

  useEffect(() => {
    fetchData(ServiceUrl.ENDPOINT_TESTS);
  }, [fetchData]);

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
            <StyledMain.Section>
              <table>
                <thead>
                  <tr>
                    <th />
                    <th />
                    <th>Value</th>
                    <th>Result</th>
                    <th>Comment</th>
                    <th>Help</th>
                  </tr>
                </thead>
                <Suspense fallback="Loading results ...">
                  <tbody>
                    {data?.items?.map((item) =>
                      item.type === 'section' ? (
                        <StyledActionRow key={item.id}>
                          <td>{item.name}</td>
                          <td colSpan={4}>{item.text}</td>
                        </StyledActionRow>
                      ) : (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.text}</td>
                          <td>{item.type}</td>
                          <td>{item.level}</td>
                          <td>{item.projectType}</td>
                          {/* <td>{item.parent || ''}</td> */}
                        </tr>
                      ),
                    )}
                  </tbody>
                </Suspense>
              </table>
            </StyledMain.Section>
          </LoadingWrapper>
        </StyledMain.Article>
      </StyledMain>
    </>
  );
};

export default TestsPage;

const StyledActionRow = styled.tr`
  font-weight: bold;
`;
