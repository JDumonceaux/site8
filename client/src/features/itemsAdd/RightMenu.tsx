import React, { useEffect } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import styled from 'styled-components';

import useArtistItems from './useArtistItems';

type Props = {
  readonly artistId?: string;
};

const RightMenu = ({ artistId = '' }: Props): React.JSX.Element => {
  const { data, isError, isPending } = useArtistItems();

  useEffect(() => {
    if (!artistId || artistId === '') {
      return;
    }
    fetch(artistId);
  }, [artistId]);

  return (
    <StickyMenu>
      <LoadingWrapper isError={isError} isPending={isPending}>
        <ul>
          {data?.items?.map((item) => (
            <li key={item.key}>{item.display ?? 'Missing'}</li>
          ))}
        </ul>
      </LoadingWrapper>
    </StickyMenu>
  );
};

RightMenu.displayName = 'RightMenu';

export default RightMenu;

const StickyMenu = styled.div`
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  padding-bottom: 20px;
`;
