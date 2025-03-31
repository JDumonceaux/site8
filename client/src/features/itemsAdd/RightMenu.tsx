import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import styled from 'styled-components';

import useArtistItems from './useArtistItems';

type Props = {
  readonly artistId?: string;
};

const RightMenu = ({ artistId = '' }: Props): React.JSX.Element => {
  const { data, error, isError, isLoading } = useArtistItems(artistId);

  return (
    <StickyMenu>
      <LoadingWrapper error={error} isError={isError} isLoading={isLoading}>
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
