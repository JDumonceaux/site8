import { type JSX, Suspense, useDeferredValue } from 'react';

import StickyMenuWrapper from '@common/layout/StickyMenuWrapper';
import LoadingWrapper from '@common/loading/LoadingWrapper';
import Meta from '@common/meta/Meta';
import PageTitle from '@common/page/PageTitle';
import SubjectMenu from '@feature/generic/SubjectMenu';
import Layout from '@feature/layouts/layout/Layout';
import type { Image } from '@types';
import styled from 'styled-components';

const GenericImagePage = (): JSX.Element => {
  // TODO: Replace with actual data fetching hook
  const data: Image[] = [];
  const isError = false;
  const isLoading = false;

  const deferredData = useDeferredValue(data);

  const pageTitle = 'Images';

  return (
    <>
      <Meta title={pageTitle} />
      <Layout.Main>
        <Layout.Menu>
          <StickyMenuWrapper variant="plain">
            <SubjectMenu />
          </StickyMenuWrapper>
        </Layout.Menu>
        <Layout.Article>
          <LoadingWrapper
            isError={isError}
            isLoading={isLoading}
          >
            <PageTitle title={pageTitle} />
            <Layout.Section>
              <Suspense fallback="Loading results ...">
                {deferredData.map((item) => (
                  <div key={item.id}>
                    <StyledImage
                      alt={item.alt}
                      src={item.src}
                    />
                    <div>{item.title}</div>
                  </div>
                ))}
              </Suspense>
            </Layout.Section>
          </LoadingWrapper>
        </Layout.Article>
        <Layout.Aside />
      </Layout.Main>
    </>
  );
};

export default GenericImagePage;

const StyledImage = styled.img`
  height: 200px;
  width: 200px;
`;
