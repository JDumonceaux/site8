import type { JSX } from 'react';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import Layout from '@features/layouts/layout/Layout';
import ItemRenderer from './ItemRenderer';
import useMusic from './useMusic';
import styled from 'styled-components';

/**
 * Displays a list of favorite YouTube videos.
 */
const MusicPage = (): JSX.Element | null => {
  const title = 'YouTube Videos';
  const { data, error, isError, isLoading } = useMusic();

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <PageTitle title={title} />

        <Section aria-label="Favorite YouTube videos">
          <Description>
            These are some of my favorite YouTube videos.
          </Description>

          <LoadingWrapper
            error={error}
            isError={isError}
            isLoading={isLoading}
          >
            {data?.items && data.items.length > 0 ? (
              <ul>
                {data.items.map((item, index) => (
                  <ItemRenderer
                    data={data}
                    index={index}
                    key={item.id}
                  />
                ))}
              </ul>
            ) : (
              <EmptyPlaceholder>No videos available.</EmptyPlaceholder>
            )}
          </LoadingWrapper>
        </Section>
      </Layout.Main>
    </>
  );
};

MusicPage.displayName = 'MusicPage';
export default MusicPage;

// Styled Components
const Section = styled.section`
  margin: 1rem 0;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const EmptyPlaceholder = styled.div`
  text-align: center;
  color: var(--palette-muted, #666);
  padding: 2rem 0;
`;

