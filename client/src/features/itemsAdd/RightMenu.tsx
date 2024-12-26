import React, { memo, useEffect } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import { styled } from 'styled-components';

import useArtistItems from './useArtistItems';

type Props = {
  readonly artistId?: string;
};

const RightMenu = ({ artistId = '' }: Props): React.JSX.Element => {
  const { error, fetch, isLoading, itemsAsListItem } = useArtistItems();

  useEffect(() => {
    if (!artistId || artistId === '') {
      return;
    }
    fetch(artistId);
  }, [artistId]);

  return (
    <StickyMenu>
      <LoadingWrapper error={error} isLoading={isLoading}>
        <ul>
          {itemsAsListItem?.map((item) => (
            <li key={item.key}>{item.display ?? 'Missing'}</li>
          ))}
        </ul>
      </LoadingWrapper>
    </StickyMenu>
  );
};

export default memo(RightMenu);

const StickyMenu = styled.div`
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  padding-bottom: 20px;
`;
