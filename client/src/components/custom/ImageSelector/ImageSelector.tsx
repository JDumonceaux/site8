import {
  memo,
  useState,
  useCallback,
  useDeferredValue,
  useMemo,
  type JSX,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import { Switch } from 'components/Switch/Switch';
import useAppSettings from 'features/app/useAppSettings';
import useUnmatchedImages from 'features/itemsAdd/useUnmatchedImages';
import { IMAGE_BASE } from 'lib/utils/constants';
import styled from 'styled-components';
import type { Image } from 'types';

export type ImageSelectorProps = {
  onSelectImage: (image: Image | undefined) => void;
};

/**
 * Image grid with filtering, selection, and deferred count.
 */
function ImageSelector({ onSelectImage }: ImageSelectorProps): JSX.Element {
  const { setShowUnmatched, showUnmatched } = useAppSettings();
  const { data } = useUnmatchedImages();
  const [selectedItem, setSelectedItem] = useState<Image | undefined>();

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
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const id = Number(e.currentTarget.id);
      const item = data?.items.find((x) => x.id === id);
      setSelectedItem(item);
      onSelectImage(item);
    },
    [data?.items, onSelectImage],
  );

  const onKeyboardSelect = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const id = Number(e.currentTarget.id);
        const item = data?.items.find((x) => x.id === id);
        setSelectedItem(item);
        onSelectImage(item);
      }
    },
    [data?.items, onSelectImage],
  );

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (selectedItem) return data.items.filter((x) => x.id === selectedItem.id);
    return data.items;
  }, [data, selectedItem]);

  const itemCount = useDeferredValue(filteredData.length);

  return (
    <>
      <Controls>
        <button onClick={() => null} type="button">
          Refresh
        </button>
        <button onClick={onShowAll} type="button">
          Show All
        </button>
        <Switch
          checked={showUnmatched}
          id="showUnmatched"
          label={showUnmatched ? 'Hide Unmatched' : 'Show Unmatched'}
          onCheckedChange={onShowUnmatched}
        />
        <Count>{itemCount}</Count>
      </Controls>

      <LoadingWrapper>
        <Grid>
          {filteredData.map((item) => (
            <ImageButton
              $selected={selectedItem?.id === item.id}
              id={String(item.id)}
              key={item.id}
              onClick={onSelect}
              onKeyDown={onKeyboardSelect}
              type="button">
              <img alt="" src={`${IMAGE_BASE}/${item.fileName}`} />
            </ImageButton>
          ))}
        </Grid>
      </LoadingWrapper>
    </>
  );
}

ImageSelector.displayName = 'ImageSelector';
export default memo(ImageSelector);

/* -- styles -- */

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    font-size: 0.875rem;
  }
`;

const Count = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
`;

const ImageButton = styled.button<{ $selected: boolean }>`
  padding: 0;
  border: ${({ $selected }) =>
    $selected ? '2px solid var(--focus-ring-color)' : '1px solid #ddd'};
  border-radius: 4px;
  overflow: hidden;
  background: transparent;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring-color);
    outline-offset: 2px;
  }
`;
