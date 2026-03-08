import { type JSX, useMemo } from 'react';

import InputSelect from '@components/input/input-select/InputSelect';
import SlideoutDialog from '@components/slideout-dialog/SlideoutDialog';
import type { ListItem } from '@types';
import type { MatchedFilter } from './useImages';
import styled from 'styled-components';

export type ImageFiltersDialogProps = {
  readonly availableFolders: readonly string[];
  readonly folderFilter: string;
  readonly isOpen: boolean;
  readonly matchedFilter: MatchedFilter;
  readonly onClose: () => void;
  readonly setFolderFilter: (folder: string) => void;
  readonly setMatchedFilter: (filter: MatchedFilter) => void;
};

const MATCHED_OPTIONS: ListItem[] = [
  { display: 'All', key: 'all', value: 'all' },
  { display: 'Matched only', key: 'matchedOnly', value: 'matchedOnly' },
  { display: 'Unmatched only', key: 'unmatchedOnly', value: 'unmatchedOnly' },
];

const ImageFiltersDialog = ({
  availableFolders,
  folderFilter,
  isOpen,
  matchedFilter,
  onClose,
  setFolderFilter,
  setMatchedFilter,
}: ImageFiltersDialogProps): JSX.Element => {
  const folderOptions = useMemo<ListItem[]>(
    () => [
      { display: 'All Folders', key: '', value: '' },
      ...availableFolders.map((folder) => ({
        display: folder,
        key: folder,
        value: folder,
      })),
    ],
    [availableFolders],
  );

  const handleClearAll = (): void => {
    setMatchedFilter('all');
    setFolderFilter('');
  };

  return (
    <SlideoutDialog
      isOpen={isOpen}
      onApply={onClose}
      onClose={onClose}
      title="Image Filters"
    >
      <ClearAllLink onClick={handleClearAll}>Clear All</ClearAllLink>
      <FilterGroup>
        <InputSelect
          dataList={MATCHED_OPTIONS}
          label="Status"
          onChange={(event) => {
            setMatchedFilter(event.target.value as MatchedFilter);
          }}
          value={matchedFilter}
        />
      </FilterGroup>
      <FilterGroup>
        <InputSelect
          dataList={folderOptions}
          label="Folder"
          onChange={(event) => {
            setFolderFilter(event.target.value);
          }}
          value={folderFilter}
        />
      </FilterGroup>
    </SlideoutDialog>
  );
};

export default ImageFiltersDialog;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 1rem;
`;

const ClearAllLink = styled.button`
  background: none;
  border: none;
  color: var(--link-color);
  cursor: pointer;
  font-size: var(--font-size-sm);
  padding: 0;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;
