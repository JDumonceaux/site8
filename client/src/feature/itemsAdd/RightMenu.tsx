import React, { memo } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import useImageFolder from 'feature/imagesEdit/useImageFolder';
import { styled } from 'styled-components';

type Props = {
  readonly currentFilter: string;
};

const RightMenu = ({ currentFilter }: Props): React.JSX.Element => {
  const { data, error, isLoading } = useImageFolder();

  return (
    <StickyMenu>
      <LoadingWrapper error={error} isLoading={isLoading}>
        <ul>{data?.map((item) => <li key={item.id}>{item.value}</li>)}</ul>
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
