import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import { msgFormatter } from 'app/util';
import FilterBar from 'empower-components/FilterBar';
import useFilterBar from 'wwwroot/feature/common/filter/useFilterBar';
import { getNoteTypes } from './NotesCategoryUtils';

/**
 * This is very similar to the filter used in the Details View,
 * however this version uses local state vs. updating Redux state
 * (updateQuoteItemFilters).
 * If you look at state.Quote, there are multiple filters objects - there
 * may be an opportunity to consolidate or refactor some of the logic.
 */
const ItemFilter = ({ filter, onChange, show }) => {
  const [filterText, setFilterText] = useState(filter.text || '');
  const searchTimeoutRef = useRef(null);

  const {
    handleChange: handleProductFamilyFilterFB,
    handleClear: handleProductFamilyFilterClearFB,
    optionsWithCount: productFamilyOptionsFormatted,
    values: productFamilyValues,
  } = useFilterBar(filter.options.productFamily, 'value', '');

  const {
    handleChange: handleTagsFilterFB,
    handleClear: handleTagsFilterClearFB,
    options: tagOptionsFormatted,
    values: tagValues,
  } = useFilterBar(filter.options.tags, 'value', '');

  const {
    handleChange: handleItemGroupingsFilterFB,
    handleClear: handleItemGroupingsFilterClearFB,
    options: itemGroupingsOptionsFormatted,
    values: itemGroupingsValues,
  } = useFilterBar(filter.options.itemGroupings, 'value', '');

  const noteTypes = getNoteTypes(filter.options.noteTypes);

  const {
    handleChange: handleNoteTypesFilterFB,
    handleClear: handleNoteTypesFilterClearFB,
    options: noteTypesOptionsFormatted,
    values: noteTypesValues,
  } = useFilterBar(noteTypes, 'value', '');

  const handleChange = (field, value) => {
    const temporaryFilter = {
      itemGroupings: itemGroupingsValues,
      noteTypes: noteTypesValues,
      productFamily: productFamilyValues,
      tags: tagValues,
      text: filterText,
    };
    const currentFilter = {
      ...temporaryFilter,
      [field]: value,
    };
    onChange(currentFilter);
  };

  const handleSearchFilter = (value) => {
    setFilterText(value);
    if (value.length > 1) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(() => {
        handleChange('text', value);
      }, 300);
    }
  };

  const handleProductFamilyFilter = (value) => {
    handleProductFamilyFilterFB(value);
    handleChange('productFamily', value);
  };

  const handleTagsFilter = (value) => {
    handleTagsFilterFB(value);
    handleChange('tags', value);
  };

  const handleItemGroupingsFilter = (value) => {
    handleItemGroupingsFilterFB(value);
    handleChange('itemGroupings', value);
  };

  const handleNoteTypesFilter = (value) => {
    handleNoteTypesFilterFB(value);
    handleChange('noteTypes', value);
  };

  const handleFilterClear = () => {
    setFilterText('');
    handleProductFamilyFilterClearFB();
    handleTagsFilterClearFB();
    handleItemGroupingsFilterClearFB();
    handleNoteTypesFilterClearFB();
    const temporaryFilter = {
      itemGroupings: [],
      noteTypes: [],
      productFamily: [],
      tags: [],
      text: '',
    };
    onChange(temporaryFilter);
  };

  const handleProductFamilyFilterClear = () => {
    handleProductFamilyFilterClearFB();
    handleChange('productFamily', []);
  };

  const handleTagsFilterClear = () => {
    handleTagsFilterClearFB();
    handleChange('tags', []);
  };

  const handleItemGroupingsFilterClear = () => {
    handleItemGroupingsFilterClearFB();
    handleChange('itemGroupings', []);
  };

  const handleNoteTypesFilterClear = () => {
    handleNoteTypesFilterClearFB();
    handleChange('noteTypes', []);
  };

  const filters = [
    {
      displayVal: msgFormatter('productFamily')(),
      handleFilterChange: handleProductFamilyFilter,
      handleFilterClear: handleProductFamilyFilterClear,
      includeCount: true,
      menuWidth: 350,
      name: 'family',
      optionItems: productFamilyOptionsFormatted,
      show: true,
      values: productFamilyValues,
    },
    {
      displayVal: msgFormatter('tags')(),
      handleFilterChange: handleTagsFilter,
      handleFilterClear: handleTagsFilterClear,
      includeCount: false,
      menuWidth: 200,
      name: 'tags',
      optionItems: tagOptionsFormatted,
      show: true,
      values: tagValues,
    },
    {
      displayVal: msgFormatter('itemGroupings')(),
      handleFilterChange: handleItemGroupingsFilter,
      handleFilterClear: handleItemGroupingsFilterClear,
      includeCount: false,
      menuWidth: 250,
      name: 'itemGroupings',
      optionItems: itemGroupingsOptionsFormatted,
      show: true,
      values: itemGroupingsValues,
    },
    {
      displayVal: msgFormatter('noteTypes')(),
      handleFilterChange: handleNoteTypesFilter,
      handleFilterClear: handleNoteTypesFilterClear,
      includeCount: false,
      menuWidth: 250,
      name: 'noteTypes',
      optionItems: noteTypesOptionsFormatted,
      show: true,
      values: noteTypesValues,
    },
  ];

  React.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <FilterBar
      search={{
        handleSearchFilter,
        input: filterText,
      }}
      aria-label="filter bar"
      clearFilterLabel={msgFormatter('clearFilter')()}
      filters={filters}
      handleFilterClear={handleFilterClear}
      clearIcon="fal fa-times"
      dropdownIcon="fal fa-chevron-down"
      placeholder=""
      show={show}
    />
  );
};

ItemFilter.displayName = 'ItemFilter';

const mapStateToProps = (state) => ({
  filter: {
    options: {
      itemGroupings: state.Quote.quoteItemFilters.productTagOptions,
      noteTypes: state.App.filters.noteCategories,
      productFamily: state.Quote.quoteItemFilters.familyOptions,
      tags: state.Quote.quoteItemFilters.tagOptions,
    },
  },
});

export default connect(mapStateToProps)(ItemFilter);
