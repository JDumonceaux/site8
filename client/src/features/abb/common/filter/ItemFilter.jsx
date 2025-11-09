import React, { useCallback } from "react";
import { connect } from "react-redux";

import {
    resetQuoteItemFilters,
    toggleOrderedItem,
    updateQuoteItemFilters
} from "actions/QuoteActions";
import { msgFormatter } from "app/util";
import FilterBar from "empower-components/FilterBar";
import useDebounceSearch from "./useDebounceSearch";
import useFilterBar from "./useFilterBar";

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
    updateQuoteItemFilters
}) => {
    // Memoize the search callback to prevent unnecessary re-renders
    const handleSearchUpdate = useCallback((searchValue) => {
        updateQuoteItemFilters("filterText", searchValue);
    }, [updateQuoteItemFilters]);

    // Use the debounced search hook
    const { handleSearch: handleSearchFilter, searchText: filterText } = useDebounceSearch(
        initFilterText,
        handleSearchUpdate,
        FILTER_CONFIG.SEARCH_DELAY,
        FILTER_CONFIG.MIN_SEARCH_LENGTH
    );

    const {
        handleChange: handleProductFamilyFilterFB,
        handleClear: handleProductFamilyFilterClearFB,
        optionsWithCount: productFamilyOptionsFormatted,
        values: productFamilyValues
    } = useFilterBar(productFamilyOptions, "value", productFamilyValuesInit);

    const {
        handleChange: handleTagsFilterFB,
        handleClear: handleTagsFilterClearFB,
        options: tagOptionsFormatted,
        values: tagValues
    } = useFilterBar(tagOptions, "value", tagValuesInit);

    const {
        handleChange: handleItemGroupingsFilterFB,
        handleClear: handleItemGroupingsFilterClearFB,
        options: itemGroupingsOptionsFormatted,
        values: itemGroupingsValues
    } = useFilterBar(itemGroupingsOptions, "value", itemGroupingsValuesInit);



    const handleProductFamilyFilter = value => {
        handleProductFamilyFilterFB(value);
        updateQuoteItemFilters("familyValues", value);
    };

    const handleTagsFilter = value => {
        handleTagsFilterFB(value);
        updateQuoteItemFilters("tagValues", value);
    };

    const handleItemGroupingsFilter = value => {
        handleItemGroupingsFilterFB(value);
        updateQuoteItemFilters("productTagValues", value);
    };

    const handleFilterClear = () => {
        handleSearchFilter("");  // Clear search using the debounced handler
        resetQuoteItemFilters();
    };

    const handleProductFamilyFilterClear = () => {
        handleProductFamilyFilterClearFB();
        updateQuoteItemFilters("familyValues", []);
    };

    const handleTagsFilterClear = () => {
        handleTagsFilterClearFB();
        updateQuoteItemFilters("tagValues", []);
    };

    const handleItemGroupingsFilterClear = () => {
        handleItemGroupingsFilterClearFB();
        updateQuoteItemFilters("productTagValues", []);
    };

    const handleShowOnlyAvailableQty = () => {
        toggleOrderedItem();
    };

    const filters = [
        {
            displayVal: msgFormatter("productFamily")(),
            handleFilterChange: handleProductFamilyFilter,
            handleFilterClear: handleProductFamilyFilterClear,
            includeCount: true,
            menuWidth: 350,
            name: "family",
            optionItems: productFamilyOptionsFormatted,
            show: true,
            values: productFamilyValues
        },
        {
            displayVal: msgFormatter("tags")(),
            handleFilterChange: handleTagsFilter,
            handleFilterClear: handleTagsFilterClear,
            includeCount: false,
            menuWidth: 250,
            name: "tags",
            optionItems: tagOptionsFormatted,
            show: true,
            values: tagValues
        },
        {
            displayVal: msgFormatter("itemGroupings")(),
            handleFilterChange: handleItemGroupingsFilter,
            handleFilterClear: handleItemGroupingsFilterClear,
            includeCount: false,
            menuWidth: 250,
            name: "itemGroupings",
            optionItems: itemGroupingsOptionsFormatted,
            show: true,
            values: itemGroupingsValues
        }
    ];

    const toggles = [
        {
            checked: toggleOrderedItems,
            displayVal: msgFormatter("hideOrdered")(),
            name: "hideOrdered",
            toggleCheckbox: handleShowOnlyAvailableQty
        }
    ];

    return (
      <FilterBar
        search={{
                handleSearchFilter,
                input: filterText
            }}
        aria-label="filter bar"
        clearFilterLabel={msgFormatter("clearFilter")()}
        filters={filters}
        handleFilterClear={handleFilterClear}
        clearIcon="fal fa-times"
        dropdownIcon="fal fa-chevron-down"
        placeholder=""
        show={show}
        toggleLabel={msgFormatter("options")()}
        toggles={toggles}
      />
    );
};

ItemFilter.displayName = "ItemFilter";

const mapStateToProps = state => ({
    initFilterText: state.Quote.quoteItemFilters.filterText,
    itemGroupingsOptions: state.Quote.quoteItemFilters.productTagOptions,
    itemGroupingsValuesInit: state.Quote.quoteItemFilters.productTagValues,
    productFamilyOptions: state.Quote.quoteItemFilters.familyOptions,
    productFamilyValuesInit: state.Quote.quoteItemFilters.familyValues,
    tagOptions: state.Quote.quoteItemFilters.tagOptions,
    tagValuesInit: state.Quote.quoteItemFilters.tagValues,
    toggleOrderedItems: state.Quote.quoteItemFilters.toggleOrderedItems
});

export default connect(mapStateToProps, {
    resetQuoteItemFilters,
    toggleOrderedItem,
    updateQuoteItemFilters
})(ItemFilter);
