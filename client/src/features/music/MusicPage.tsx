import { type FC, useState, useEffect, useTransition, useMemo } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'features/layouts/Layout/Layout';
import { FixedSizeList as List } from 'react-window';
import ItemRenderer from './ItemRenderer';
import useMusic from './useMusic';
import styled from 'styled-components';

const ROW_HEIGHT = 220;

/**
 * Displays a list of favorite YouTube videos in a virtualized scrollable list,
 * leveraging useTransition to defer updating the list when new data arrives.
 */
const MusicPage: FC = () => {
  const title = 'YouTube Videos';
  const { data, error, isError, isLoading } = useMusic();

  // Transition for deferring heavy list updates
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState(data?.items ?? []);

  // When data.items changes, update items state in a transition
  useEffect(() => {
    startTransition(() => {
      setItems(data?.items ?? []);
    });
  }, [data?.items, startTransition]);

  // Memoize itemData for referential stability
  const itemData = useMemo(() => ({ items }), [items]);

  return (
    <>
      <Meta title={title} />

      <Layout.Main>
        <PageTitle title={title} />

        <Section aria-label="Favorite YouTube videos" aria-busy={isPending}>
          <Description>
            These are some of my favorite YouTube videos.
          </Description>

          <LoadingWrapper error={error} isError={isError} isLoading={isLoading}>
            {items.length > 0 ? (
              <List
                height={600}
                itemCount={items.length}
                itemData={itemData}
                itemSize={ROW_HEIGHT}
                overscanCount={15}
                width="100%">
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
