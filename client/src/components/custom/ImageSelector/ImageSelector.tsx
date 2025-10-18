import {
  useState,
  useDeferredValue,
  type JSX,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';

import LoadingWrapper from '@components/core/Loading/LoadingWrapper';
import { Switch } from '@components/Switch/Switch';
import useAppSettings from '@features/app/useAppSettings';
import useUnmatchedImages from '@features/itemsAdd/useUnmatchedImages';
import { IMAGE_BASE } from 'lib/utils/constants';
import styled from 'styled-components';
import type { Image } from 'types';

export type ImageSelectorProps = {
  onSelectImage: (image: Image | undefined) => void;
};

const ImageSelector = ({ onSelectImage }: ImageSelectorProps): JSX.Element => {
  const { setShowUnmatched, showUnmatched } = useAppSettings();
  const { data } = useUnmatchedImages();
  const [selectedItem, setSelectedItem] = useState<Image | undefined>();

  function handleShowAll(): void {
    setSelectedItem(undefined);
  }

  function handleShowUnmatched(checked: boolean): void {
    setShowUnmatched(checked);
  }

  function handleSelect(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    const id = Number(e.currentTarget.id);
    const item = data?.items.find((x) => x.id === id);
    setSelectedItem(item);
    onSelectImage(item);
  }

  function handleKeyboardSelect(e: KeyboardEvent<HTMLButtonElement>): void {
    if (e.key === 'Enter') {
      e.preventDefault();
      const id = Number(e.currentTarget.id);
      const item = data?.items.find((x) => x.id === id);
      setSelectedItem(item);
      onSelectImage(item);
    }
  }

  const filteredData = !data
    ? []
    : selectedItem
      ? data.items.filter((x) => x.id === selectedItem.id)
      : data.items;

  const itemCount = useDeferredValue(filteredData.length);

  return (
    <>
      <Controls>
        <button
          onClick={() => null}
          type="button"
        >
          Refresh
        </button>
        <button
          onClick={handleShowAll}
          type="button"
        >
          Show All
        </button>
        <Switch
          checked={showUnmatched}
          id="showUnmatched"
          label={showUnmatched ? 'Hide Unmatched' : 'Show Unmatched'}
          onCheckedChange={handleShowUnmatched}
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
              onClick={handleSelect}
              onKeyDown={handleKeyboardSelect}
              type="button"
            >
              <img
                alt=""
                src={`${IMAGE_BASE}/${item.fileName}`}
              />
            </ImageButton>
          ))}
        </Grid>
      </LoadingWrapper>
    </>
  );
};

ImageSelector.displayName = 'ImageSelector';
export default ImageSelector;

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
