import React, { memo, useCallback } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import useItems from 'features/itemsAdd/useItems';
import { styled } from 'styled-components';

type Props = {
  readonly currentFilter: string;
};

const RightMenu = ({ currentFilter }: Props): React.JSX.Element => {
  const { data, error, isLoading } = useItems();

  const filteredData = useCallback(() => {
    return data?.items.filter((x) => x.artist === currentFilter);
  }, [data, currentFilter]);

  return (
    <StickyMenu>
      <LoadingWrapper error={error} isLoading={isLoading}>
        <ul>
          {filteredData()?.map((item) => (
            <li key={item.id}>{item.name ?? 'Missing'}</li>
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
