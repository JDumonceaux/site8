import type { JSX } from 'react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import PageTitle from '@components/core/page/PageTitle';
import Layout from '@features/layouts/layout/Layout';
import { logError } from '@lib/utils/errorLogger';
import Items from './Items';
import useImages from './useImages';

const ImagesPage = (): JSX.Element => {
  const { folder, tag } = useParams<{
    folder?: string;
    tag?: string;
  }>();

  const { data, error, isError, isLoading } = useImages();

  if (isError && error) {
    logError(error, {
      componentName: 'ImagesPage',
      action: 'loadImages',
    });
  }

  // Filter data based on URL parameters
  const filteredData = useMemo(() => {
    if (!data || !data.items) return data;

    let filtered = data.items;

    // Filter by folder
    if (folder) {
      filtered = filtered.filter((image) => image.folder === folder);
    }

    // Filter by tag
    if (tag) {
      filtered = filtered.filter(
        (image) => image.tags && image.tags.includes(tag),
      );
    }

    return { ...data, items: filtered };
  }, [data, folder, tag]);

  // Determine page title based on URL parameters
  const pageTitle = useMemo(() => {
    if (folder) {
      return `Images - ${folder}`;
    }
    if (tag) {
      return `Images - ${tag}`;
    }
    return 'Images Gallery';
  }, [folder, tag]);

  return (
    <>
      <title>{pageTitle}</title>
      <meta
        name="description"
        content="Browse our image gallery collection."
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
