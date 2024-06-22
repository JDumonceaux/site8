import { LoadingWrapper, Meta, PageTitle } from 'components';
import StyledMain from 'components/common/StyledMain/StyledMain';
import SubjectMenu from 'components/ui/GenericPage/SubjectMenu';
import { useAxios } from 'hooks/Axios';
import { Suspense, useEffect } from 'react';
import { styled } from 'styled-components';
import { Tests } from 'types/Tests';
import { ServiceUrl } from 'utils/constants';

const TestsPage = (): JSX.Element => {
  const { data, isLoading, error, fetchData } = useAxios<Tests>();

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
                    <th></th>
                    <th></th>
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
