import { Suspense } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'components/layouts/Layout/Layout';
import SubjectMenu from 'features/generic/SubjectMenu';
import { styled } from 'styled-components';

import useTests from './useTests';

const TestsPage = (): React.JSX.Element => {
  const { data, isError, isPending } = useTests();

  const pageTitle = 'Tests';

  return (
    <>
      <Meta title={pageTitle} />
      <Layout.Main>
        <Layout.Menu>
          <SubjectMenu />
        </Layout.Menu>
        <Layout.Article>
          <LoadingWrapper isError={isError} isPending={isPending}>
            <PageTitle title={pageTitle} />
            <Layout.Section>
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
            </Layout.Section>
          </LoadingWrapper>
        </Layout.Article>
      </Layout.Main>
    </>
  );
};

export default TestsPage;

const StyledActionRow = styled.tr`
  font-weight: bold;
`;
