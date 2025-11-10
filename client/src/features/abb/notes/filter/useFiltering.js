import groupBy from "lodash/groupBy";

// 1 Private function: filter by product family
const filterByProductFamily = (items, filterParam) => {
    const tempValues = filterParam?.map(x => x.value);
    if (tempValues && tempValues.length > 0) {
        return items.filter(x => tempValues.includes(x.ProductFamily));
    }
    return items;
};

// 3 Private function: filter by Text
const filterByText = (items, filterText) => {
    if (filterText && filterText !== "") {
        const searchedBy = ["Note", "CreatedBy", "ModifiedBy"];
        return items.filter(x =>
            searchedBy.some(key =>
                x[key].toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }
    return items;
};

// 2 Private function: filter by Note Type
const filterByNoteTypes = (items, filterParam) => {
    const tempValues = filterParam?.map(x => x.value);
    if (tempValues && tempValues.length > 0) {
        return items.filter(x => tempValues.includes(x.CategoryName));
    }
    return items;
};


// 2 Private function: filter by Note Type - variation
const filterByNoteTypes2 = (items, filterParam) => {
    const tempValues = filterParam?.map(x => x.value);
    if (tempValues && tempValues.length > 0) {
        // Filter quotes
        const quotes = items.filter(x =>
            x.Notes.some(y => tempValues.includes(y.CategoryName))
        );
        // Return only the quotes and notes that match the filter
        const returnValue = [];
        for (const x of quotes) {
            const newNotes = x.Notes.filter(y =>
                tempValues.includes(y.CategoryName)
            );
            if (newNotes.length > 0) {
                returnValue.push({ ...x, Notes: newNotes });
            }
        }
        return returnValue;
    }
    return items;
};

// 3 Private function: filter by Text
const filterByText2 = (items, filterText) => {
    if (filterText && filterText !== "") {
        const lowerText = filterText.toLowerCase();
        return items.filter(x =>
            x.Notes.some(
                note =>
                    x.ProductDescription.toLowerCase().includes(
                        lowerText
                    ) ||
                    (x.Marks === null
                        ? false
                        : x.Marks.toLowerCase().includes(lowerText)) ||
                    note.Note.toLowerCase().includes(lowerText) ||
                    note.CreatedBy.toLowerCase().includes(lowerText) ||
                    note.ModifiedBy.toLowerCase().includes(lowerText)
            )
        );
    }
    return items;
};

// 5 Private function: filter by Item Groupings
const filterByItemGroupings = (items, filterParam, tagsParam) => {
    if (filterParam && filterParam.length > 0) {
        const itemGroupingsValues = new Set(filterParam.map(x => x.value));
        const set1 = new Set(tagsParam.productItemTags
            .filter(x => itemGroupingsValues.has(x.Description))
            .map(x => x.QuoteItemID));

        const combinedIds = new Set(set1);

        if (itemGroupingsValues.has("All Others")) {
            const allGroupedItems = new Set(tagsParam.productItemTags.map(
                x => x.QuoteItemID
            ));
            const set2 = items
                .filter(x => !allGroupedItems.has(x.QuoteItemID))
                .map(x => x.QuoteItemID);
            for (const id of set2) combinedIds.add(id);
        }

        return items.filter(x => combinedIds.has(x.QuoteItemID));
    }
    return items;
};

const useFiltering = (quote, filter, tags) => {

    // 4 Private function: filter by Tags
    const filterByTags = (items, filterParam) => {
        const tempValues = filterParam?.map(x => x.value);
        if (tempValues && tempValues.length > 0) {
            const filteredItemTags = new Set(tags.itemsTags
                .filter(x => tempValues.includes(x.Description))
                .map(x => x.QuoteItemID));
            return items.filter(x => filteredItemTags.has(x.QuoteItemID));
        }
        return items;
    };

    const getFilteredQuoteNotes = () => {
        const items = quote.Notes.filter(x => !x.ProductFamily);
        // Filter by product family
        const items2 = filter?.productFamily?.length > 0 ? [] : items;
        // Filter by Note Type
        const items3 = filterByNoteTypes(items2, filter.noteTypes);
        // Filter by Text
        const items4 = filterByText(items3, filter.text);
        // Filter by Tags
        const items5 = filter?.tags?.length > 0 ? [] : items4;
        // Filter by Item Groupings
        const items6 = filter?.itemGroupings?.length > 0 ? [] : items5;
        return items6;
    };

    const getFilteredProductFamilyNotes = () => {
        const items = quote.Notes.filter(x => x.ProductFamily);
        // Filter by product family
        const items2 = filterByProductFamily(items, filter.productFamily);
        // Filter by Note Type
        const items3 = filterByNoteTypes(items2, filter.noteTypes);
        // Filter by Text
        const items4 = filterByText(items3, filter.text);
        // Filter by Tags
        const items5 = filterByTags(items4, filter.tags);
        // Filter by Item Groupings
        const items6 = filter?.itemGroupings?.length > 0 ? [] : items5;

        return Object.values(groupBy(items6, "ProductFamily"));
    };

    const getFilteredItemsWithNotes = () => {
        const items = [];
        // Pull the notes off the Quote Items
        for (const x of quote.QuoteItems) {
            if (x.Notes.length > 0) {
                items.push(x);
            }
        }

        // Filter by product family
        const items2 = filterByProductFamily(items, filter.productFamily);
        // Filter by Note Type
        // Filter by Item Groupings
        const items3 = filterByItemGroupings(items2, filter.itemGroupings, tags);
        const items4 = filterByText2(items3, filter.text);
        // Filter by Tags
        const items5 = filterByTags(items4, filter.tags);
        // Filter by Item Groupings
        const items6 = filterByItemGroupings(items5, filter.itemGroupings);

        return items6;
    };

    const getFilterItems = () => {
        const filteredQuoteNotes = getFilteredQuoteNotes();
        const filteredProductFamilyNotes = getFilteredProductFamilyNotes();
        const filteredItemsWithNotes = getFilteredItemsWithNotes();

        return {
            filteredItemsWithNotes,
            filteredProductFamilyNotes,
            filteredQuoteNotes
        };
    };

    const hasFilter = filter
        ? filter.text !== "" ||
        filter.itemGroupings?.length > 0 ||
        filter.productFamily?.length > 0 ||
        filter.tags?.length > 0 ||
        filter.noteTypes?.length > 0
        : false;

    return {
        filteredItems: getFilterItems(),
        hasFilter
    };
};

export default useFiltering;
