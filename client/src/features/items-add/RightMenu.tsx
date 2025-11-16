import { memo, type JSX } from 'react';

import LoadingWrapper from '@components/core/loading/LoadingWrapper';
import styled from 'styled-components';

import useArtistItems from './useArtistItems';

interface RightMenuProps {
  readonly artistId?: string;
}

const RightMenu = ({ artistId }: RightMenuProps): JSX.Element => {
  const { error, isError, isLoading, itemsAsListItem } = useArtistItems(
    artistId ?? '',
    { enabled: Boolean(artistId) },
  );

  return (
    <StickyMenu>
      <LoadingWrapper
        error={error}
        isError={isError}
        isLoading={isLoading}
      >
        {itemsAsListItem.length > 0 ? (
          <StyledList
            role="list"
            aria-label="Artist items"
          >
            {itemsAsListItem.map((item) => (
              <StyledListItem key={item.key}>
                {item.display || 'Untitled'}
              </StyledListItem>
            ))}
          </StyledList>
        ) : (
          <EmptyState>No items found for this artist</EmptyState>
        )}
      </LoadingWrapper>
    </StickyMenu>
  );
};

RightMenu.displayName = 'RightMenu';

export default memo(RightMenu);

const StickyMenu = styled.div`
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  padding-bottom: 20px;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li`
  padding: 8px 12px;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

const EmptyState = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
  font-style: italic;
`;
