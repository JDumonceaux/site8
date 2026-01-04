import type { JSX } from 'react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '@components/core/page/PageTitle';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import Layout from '@features/layouts/layout/Layout';
import { isNonEmptyString } from '@lib/utils/boolean-checks';
import { logError } from '@lib/utils/errorHandler';
import Items from './Items';
import useImages from './useImages';
import styled from 'styled-components';

const ImagesPage = (): JSX.Element => {
  const { folder, tag } = useParams<{
    folder?: string;
    tag?: string;
  }>();

  const { data, error, isError, isLoading } = useImages();

  if (isError && error) {
    logError(error, {
      action: 'loadImages',
      componentName: 'ImagesPage',
    });
  }

  // Filter data based on URL parameters
  const filteredData = useMemo(() => {
    if (!data?.items) return data;

    let filtered = data.items;

    // Filter by folder
    if (isNonEmptyString(folder)) {
      filtered = filtered.filter((image) => image.folder === folder);
    }

    // Filter by tag
    if (isNonEmptyString(tag)) {
      filtered = filtered.filter((image) => image.tags?.includes(tag));
    }

    return { ...data, items: filtered };
  }, [data, folder, tag]);

  // Determine page title based on URL parameters
  const pageTitle = useMemo(() => {
    if (isNonEmptyString(folder)) {
      return `Images - ${folder}`;
    }
    if (isNonEmptyString(tag)) {
      return `Images - ${tag}`;
    }
    return 'Images Gallery';
  }, [folder, tag]);

  return (
    <>
      <title>{pageTitle}</title>
      <meta
        content="Browse our image gallery collection."
        name="description"
      />
      <StyledPageLayout>
        <Layout.Main>
          <PageTitle title={pageTitle} />
          <section>
            <LoadingWrapper
              error={error}
              isError={isError}
              isLoading={isLoading}
            >
              <Items data={filteredData} />
            </LoadingWrapper>
          </section>
        </Layout.Main>
      </StyledPageLayout>
    </>
  );
};

export default ImagesPage;

const StyledPageLayout = styled.div`
  display: flex;
  min-height: 100vh;
`;
