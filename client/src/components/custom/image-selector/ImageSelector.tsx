import {
  type JSX,
  type KeyboardEvent,
  type MouseEvent,
  useDeferredValue,
  useEffectEvent,
  useMemo,
  useState,
} from 'react';

import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import Switch from '@components/ui/switch/Switch';
import useAppSettings from '@features/app/useAppSettings';
import useUnmatchedImages from '@hooks/useUnmatchedImages';
import { IMAGE_BASE } from '@lib/utils/constants';
import type { Image } from '@types';
import styled from 'styled-components';

export type ImageSelectorProps = {
  onSelectImage: (image: Image | undefined) => void;
};

const ImageSelector = ({ onSelectImage }: ImageSelectorProps): JSX.Element => {
  const { setShowUnmatched, showUnmatched } = useAppSettings();
  const { data } = useUnmatchedImages();
  const [selectedItem, setSelectedItem] = useState<Image | undefined>();

  const handleShowAll = useEffectEvent((): void => {
    setSelectedItem(undefined);
  });

  const handleShowUnmatched = useEffectEvent((checked: boolean): void => {
    setShowUnmatched(checked);
  });

  const handleSelect = useEffectEvent(
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      const id = Number(e.currentTarget.id);
      const item = data?.items?.find((x) => x.id === id);
      setSelectedItem(item);
      onSelectImage(item);
    },
  );

  const handleKeyboardSelect = useEffectEvent(
    (e: KeyboardEvent<HTMLButtonElement>): void => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const id = Number(e.currentTarget.id);
        const item = data?.items?.find((x) => x.id === id);
        setSelectedItem(item);
        onSelectImage(item);
      }
    },
  );

  const filteredData = useMemo(
    () =>
      data
        ? selectedItem
          ? (data.items?.filter((x) => x.id === selectedItem.id) ?? [])
          : (data.items ?? [])
        : [],
    [data, selectedItem],
  );

  const itemCount = useDeferredValue(filteredData.length);

  return (
    <>
      <Controls>
        <button
          onClick={handleShowAll}
          type="button"
        >
          Show All
        </button>
        <Switch
          {...(showUnmatched !== undefined && { checked: showUnmatched })}
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
  /* Using auto-fit for responsive columns */
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
`;

const ImageButton = styled.button<{ $selected: boolean }>`
  padding: 0;
  border: ${({ $selected }) =>
    $selected ? '2px solid var(--focus-ring-color)' : '1px solid #ddd'};
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background: transparent;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  &:focus-visible {
    outline: var(--focus-outline-width) solid var(--focus-ring-color);
    outline-offset: 2px;
  }
`;
