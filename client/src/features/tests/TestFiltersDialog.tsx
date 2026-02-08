import type { JSX } from 'react';

import SlideoutDialog from '@components/ui/slideout-dialog/SlideoutDialog';
import {
  FilterGroup,
  FilterLabel,
  FilterSelect,
  ToggleInput,
  ToggleRow,
  ToggleText,
} from './TestsPage.styles';

export type TestFiltersDialogProps = {
  /** All available tags for filtering */
  allTags: readonly string[];
  /** Whether grouped view is enabled */
  isGrouped: boolean;
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Callback when dialog should close */
  onClose: () => void;
  /** Current section filter value */
  sectionFilter: string;
  /** All available section names for filtering */
  sectionNames: readonly string[];
  /** Callback to update isGrouped state */
  setIsGrouped: (grouped: boolean) => void;
  /** Callback to update section filter */
  setSectionFilter: (section: string) => void;
  /** Callback to update tag filter */
  setTagFilter: (tag: string) => void;
  /** Current tag filter value */
  tagFilter: string;
};

/**
 * Dialog component for managing test list filters.
 * Allows users to toggle grouped view and filter by section and tags.
 */
const TestFiltersDialog = ({
  allTags,
  isGrouped,
  isOpen,
  onClose,
  sectionFilter,
  sectionNames,
  setIsGrouped,
  setSectionFilter,
  setTagFilter,
  tagFilter,
}: TestFiltersDialogProps): JSX.Element => {
  return (
    <SlideoutDialog
      isOpen={isOpen}
      onApply={onClose}
      onClose={onClose}
      title="Filters"
    >
      <ToggleRow>
        <ToggleInput
          checked={isGrouped}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setIsGrouped(event.target.checked);
          }}
          type="checkbox"
        />
        <ToggleText>Grouped</ToggleText>
      </ToggleRow>
      <FilterGroup>
        <FilterLabel htmlFor="section-filter">Section:</FilterLabel>
        <FilterSelect
          disabled={!isGrouped}
          id="section-filter"
          onChange={(e) => {
            setSectionFilter(e.target.value);
          }}
          value={sectionFilter}
        >
          <option value="all">All Sections</option>
          {sectionNames.map((name) => (
            <option
              key={name}
              value={name}
            >
              {name}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>
      <FilterGroup>
        <FilterLabel htmlFor="tag-filter">Tag:</FilterLabel>
        <FilterSelect
          disabled={!isGrouped}
          id="tag-filter"
          onChange={(e) => {
            setTagFilter(e.target.value);
          }}
          value={tagFilter}
        >
          <option value="all">All Tags</option>
          {allTags.map((tag) => (
            <option
              key={tag}
              value={tag}
            >
              {tag}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>
    </SlideoutDialog>
  );
};

export default TestFiltersDialog;
