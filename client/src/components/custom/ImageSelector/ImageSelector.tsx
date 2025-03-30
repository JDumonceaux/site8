import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import { Switch } from 'components/Switch/Switch';
import useAppSettings from 'features/app/useAppSettings';
import useUnmatchedImages from 'features/itemsAdd/useUnmatchedImages';
import { IMAGE_BASE } from 'lib/utils/constants';
import styled from 'styled-components';
import type { Image } from 'types';

type ImageSelectorProps = {
  readonly onSelectImage: (image: Image | undefined) => void;
};

const ImageSelector = ({
  onSelectImage,
}: ImageSelectorProps): React.JSX.Element => {
  const { setShowUnmatched, showUnmatched } = useAppSettings();
  const { data, error, fetchData, isLoading } = useUnmatchedImages();
  const [selectedItem, setSelectedItem] = useState<Image | undefined>();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

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
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const id = Number(event.currentTarget.id);
      const item = data?.items.find((x) => x.id === id) ?? undefined;
      setSelectedItem(item);
      onSelectImage(item);
    },
    [data?.items, onSelectImage],
  );

  const onKeyboardSelect = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        const id = Number(event.currentTarget.id);
        setSelectedItem(data?.items.find((x) => x.id === id) ?? undefined);
      }
    },
    [data?.items],
  );

  const getFilteredData = useCallback((): Image[] => {
    if (!data) {
      return [];
    }
    if (selectedItem) {
      return data.items.filter((x) => x.id === selectedItem.id);
    } else if (showUnmatched) {
      return data.items.filter((x) => !x.isMatched);
    }
    return data.items;
  }, [data, selectedItem, showUnmatched]);

  const filteredData = getFilteredData();

  const itemCount = useDeferredValue(filteredData.length);

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
          id="showUnmatched"
          label={showUnmatched ? 'Hide Unmatched' : 'Show Unmatched'}
          onCheckedChange={(error_) => {
            onShowUnmatched(error_);
          }}
        />
        <div>{itemCount}</div>
      </StyledButtonRow>
      <LoadingWrapper error={error} isLoading={isLoading}>
        {filteredData.map((item) => (
          <React.Fragment key={item.id}>
            <button
              id={item.id.toString()}
              onClick={onSelect}
              onKeyDown={onKeyboardSelect}
              type="button">
              <img alt={item.name} src={`${IMAGE_BASE}/${item.fileName}`} />
            </button>
          </React.Fragment>
        ))}
      </LoadingWrapper>
    </>
  );
};

ImageSelector.displayName = 'ImageSelector';

export default ImageSelector;

const StyledButtonRow = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-right: 20px;
    font-size: 0.8rem;
  }
  label {
    font-size: 0.8rem;
  }
`;
