import {
  resetQuoteItemFilters,
  toggleOrderedItem,
  updateQuoteItemFilters,
} from 'actions/QuoteActions';
import { msgFormatter } from 'app/util';
import FilterBar from 'empower-components/FilterBar';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import useDebounceSearch from './useDebounceSearch';
import useFilterBar from './useFilterBar';

const FILTER_CONFIG = {
  MIN_SEARCH_LENGTH: 2,
  SEARCH_DELAY: 300,
};

/**
 * Renders a filter bar with product families, tags, and groupings.
 */
const ItemFilter = ({
  initFilterText,
  itemGroupingsOptions,
  itemGroupingsValuesInit,
  productFamilyOptions,
  productFamilyValuesInit,
  resetQuoteItemFilters,
  show,
  tagOptions,
  tagValuesInit,
  toggleOrderedItem,
  toggleOrderedItems,
  updateQuoteItemFilters,
}) => {
  // Memoize the search callback to prevent unnecessary re-renders
  const handleSearchUpdate = useCallback(
    (searchValue) => {
      updateQuoteItemFilters('filterText', searchValue);
    },
    [updateQuoteItemFilters],
  );

  // Use the debounced search hook
  const { handleSearch: handleSearchFilter, searchText: filterText } =
    useDebounceSearch(
      initFilterText,
      handleSearchUpdate,
      FILTER_CONFIG.SEARCH_DELAY,
      FILTER_CONFIG.MIN_SEARCH_LENGTH,
    );

  const {
    handleChange: handleProductFamilyFilterFB,
    handleClear: handleProductFamilyFilterClearFB,
    options: productFamilyOptionsFormatted,
    selectedValues: productFamilyValues,
  } = useFilterBar({
    includeCount: true,
    initialValues: productFamilyValuesInit,
    items: productFamilyOptions,
  });

  const {
    handleChange: handleTagsFilterFB,
    handleClear: handleTagsFilterClearFB,
    options: tagOptionsFormatted,
    selectedValues: tagValues,
  } = useFilterBar({
    includeCount: true,
    initialValues: tagValuesInit,
    items: tagOptions,
  });

  const {
    handleChange: handleItemGroupingsFilterFB,
    handleClear: handleItemGroupingsFilterClearFB,
    options: itemGroupingsOptionsFormatted,
    selectedValues: itemGroupingsValues,
  } = useFilterBar({
    initialValues: itemGroupingsValuesInit,
    items: itemGroupingsOptions,
  });

  const mapObjectToArray = useCallback((obj) => {
    return obj?.map((x) => x.value);
  }, []);

  const handleProductFamilyFilter = (obj) => {
    handleProductFamilyFilterFB(obj);
    updateQuoteItemFilters('familyValues', mapObjectToArray(obj));
  };

  const handleTagsFilter = (obj) => {
    handleTagsFilterFB(obj);
    updateQuoteItemFilters('tagValues', mapObjectToArray(obj));
  };

  const handleItemGroupingsFilter = (obj) => {
    handleItemGroupingsFilterFB(obj);
    updateQuoteItemFilters('productTagValues', mapObjectToArray(obj));
  };

  const handleFilterClear = () => {
    handleSearchFilter(''); // Clear search using the debounced handler
    handleItemGroupingsFilterClearFB();
    handleTagsFilterClearFB();
    handleProductFamilyFilterClearFB();
    resetQuoteItemFilters();
  };

  const handleProductFamilyFilterClear = () => {
    handleProductFamilyFilterClearFB();
    updateQuoteItemFilters('familyValues', []);
  };

  const handleTagsFilterClear = () => {
    handleTagsFilterClearFB();
    updateQuoteItemFilters('tagValues', []);
  };

  const handleItemGroupingsFilterClear = () => {
    handleItemGroupingsFilterClearFB();
    updateQuoteItemFilters('productTagValues', []);
  };

  const handleShowOnlyAvailableQty = () => {
    toggleOrderedItem();
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
      menuWidth: 250,
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
  ];

  const toggles = [
    {
      checked: toggleOrderedItems,
      displayVal: msgFormatter('hideOrdered')(),
      name: 'hideOrdered',
      toggleCheckbox: handleShowOnlyAvailableQty,
    },
  ];

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
      toggleLabel={msgFormatter('options')()}
      toggles={toggles}
    />
  );
};

ItemFilter.displayName = 'ItemFilter';

ItemFilter.propTypes = {
  initFilterText: PropTypes.string,
  itemGroupingsOptions: PropTypes.arrayOf(PropTypes.object),
  itemGroupingsValuesInit: PropTypes.arrayOf(PropTypes.object),
  productFamilyOptions: PropTypes.arrayOf(PropTypes.object),
  productFamilyValuesInit: PropTypes.arrayOf(PropTypes.object),
  resetQuoteItemFilters: PropTypes.func.isRequired,
  show: PropTypes.bool,
  tagOptions: PropTypes.arrayOf(PropTypes.object),
  tagValuesInit: PropTypes.arrayOf(PropTypes.object),
  toggleOrderedItem: PropTypes.func.isRequired,
  toggleOrderedItems: PropTypes.bool,
  updateQuoteItemFilters: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  initFilterText: state.Quote.quoteItemFilters.filterText,
  itemGroupingsOptions: state.Quote.quoteItemFilters.productTagOptions,
  itemGroupingsValuesInit: state.Quote.quoteItemFilters.productTagValues,
  productFamilyOptions: state.Quote.quoteItemFilters.familyOptions,
  productFamilyValuesInit: state.Quote.quoteItemFilters.familyValues,
  tagOptions: state.Quote.quoteItemFilters.tagOptions,
  tagValuesInit: state.Quote.quoteItemFilters.tagValues,
  toggleOrderedItems: state.Quote.quoteItemFilters.toggleOrderedItems,
});

export default connect(mapStateToProps, {
  resetQuoteItemFilters,
  toggleOrderedItem,
  updateQuoteItemFilters,
})(ItemFilter);
