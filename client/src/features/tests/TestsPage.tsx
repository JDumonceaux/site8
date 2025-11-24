import { type JSX, Suspense } from 'react';

import LoadingWrapper from '@components/core/loading-temp/LoadingWrapper';
import Meta from '@components/core/meta-temp/Meta';
import PageTitle from '@components/core/page-title/PageTitle';
import SubjectMenu from '@features/generic/SubjectMenu';
import Layout from '@features/layouts/layout-temp/Layout';
import useTests from './useTests';
import styled from 'styled-components';

const TestsPage = (): JSX.Element => {
  const { data, error, isError, isLoading } = useTests();

  const pageTitle = 'Tests';

  return (
    <>
      <Meta title={pageTitle} />
      <Layout.Main>
        <Layout.Menu>
          <SubjectMenu />
        </Layout.Menu>
        <Layout.Article>
          <LoadingWrapper
            error={error}
            isError={isError}
            isLoading={isLoading}
          >
            <PageTitle title={pageTitle} />
            <Layout.Section>
              <table>
                <thead>
                  <tr>
                    <th aria-label="item id" />
                    <th aria-label="item name" />
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
