import { type JSX, useEffect, useState, useTransition } from 'react';
import { List } from 'react-window';

import LoadingWrapper from '@components/core/loading/LoadingWrapper';
import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page-title/PageTitle';
import Layout from '@features/layouts/layout/Layout';
import ItemRenderer from './ItemRenderer';
import useMusic from './useMusic';
import styled from 'styled-components';

const ROW_HEIGHT = 220;

/**
 * Displays a list of favorite YouTube videos in a virtualized scrollable list,
 * leveraging useTransition to defer updating the list when new data arrives.
 */
const MusicPage = (): JSX.Element | null => {
  const title = 'YouTube Videos';
  const { data, error, isError, isLoading } = useMusic();

  // Transition for deferring heavy list updates
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState(data?.items ?? []);

  useEffect(() => {
    startTransition(() => {
      setItems(data?.items ?? []);
    });
  }, [data?.items, startTransition]);

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <PageTitle title={title} />

        <Section
          aria-busy={isPending}
          aria-label="Favorite YouTube videos"
        >
          <Description>
            These are some of my favorite YouTube videos.
          </Description>

          <LoadingWrapper
            error={error}
            isError={isError}
            isLoading={isLoading}
          >
            {items.length > 0 ? (
              <List
                height={600}
                itemData={{ items }}
                itemSize={ROW_HEIGHT}
                width="100%"
                itemCount={items.length}
                overscanCount={15}
              >
                {ItemRenderer}
              </List>
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
