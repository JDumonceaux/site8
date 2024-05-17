import { LoadingWrapper } from 'components/common/Loading/LoadingWrapper';
import React, { useCallback, useEffect, useState } from 'react';

import { Image } from 'services/types';
import useAppSettings from 'hooks/useAppSettings';
import useUnmatchedImages from 'hooks/useUnmatchedImages';
import { Switch } from 'components/primatives/Switch/Switch';
import { styled } from 'styled-components';
import { IMAGE_BASE } from 'utils/constants';

// type ImageSelectorProps = {
//   // readonly data?: BookmarksTags | null;
// };

export const ImageSelector = (): JSX.Element => {
  const { showUnmatched, setShowUnmatched } = useAppSettings();
  const { data, error, isLoading, fetchData } = useUnmatchedImages();
  const [selectedItem, setSelectedItem] = useState<Image | undefined>(
    undefined,
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    fetchData();
  }, []);

  const onShowAll = useCallback(() => {
    setSelectedItem(undefined);
  }, []);

  const onShowUnmatched = useCallback(
    (checked: boolean) => {
      setShowUnmatched(checked);
    },
    [setShowUnmatched],
  );

  const onSelect = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();
      const id = Number(event.currentTarget.id);
      setSelectedItem(data?.items?.find((x) => x.id === id) ?? undefined);
    },
    [data?.items],
  );

  const onKeyboardSelect = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        const id = Number(event.currentTarget.id);
        setSelectedItem(data?.items?.find((x) => x.id === id) ?? undefined);
      }
    },
    [data?.items],
  );

  const getFilteredData = useCallback(() => {
    if (selectedItem) {
      return data?.items?.filter((x) => x.id === selectedItem.id) ?? undefined;
    } else if (showUnmatched) {
      return data?.items.filter((x) => !x.isMatched);
    }
    return data?.items;
  }, [data?.items, selectedItem, showUnmatched]);

  const filteredData = getFilteredData();

  return (
    <>
      <StyledButtonRow>
        <button onClick={onRefresh} type="button">
          Refresh
        </button>
        <button onClick={onShowAll} type="button">
          Show All
        </button>
        <Switch
          checked={showUnmatched}
          defaultChecked={false}
          id="showUnmatched"
          label={showUnmatched ? 'Hide Unmatched' : 'Show Unmatched'}
          onCheckedChange={(e) => onShowUnmatched(e)}
        />
      </StyledButtonRow>
      <LoadingWrapper error={error} isLoading={isLoading}>
        {filteredData?.map((item) => (
          <React.Fragment key={item.id}>
            <button
              id={item.id.toString()}
              onClick={onSelect}
              onKeyDown={onKeyboardSelect}
              type="button">
              <img alt={item.name} src={`${IMAGE_BASE}/${item.src}`} />
            </button>
          </React.Fragment>
        ))}
      </LoadingWrapper>
    </>
  );
};

export default ImageSelector;

const StyledButtonRow = styled.div`
  display: flex;
  align-items: center;
`;
