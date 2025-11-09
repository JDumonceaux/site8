import groupBy from "lodash/groupBy";

const useFiltering = (quote, filter, tags) => {
    // 1 Private function: filter by product family
    const filterByProductFamily = (items, filter) => {
        const tempValues = filter?.map(x => x.value);
        if (tempValues && tempValues.length > 0) {
            return items.filter(x => tempValues.includes(x.ProductFamily));
        }
        return items;
    };

    // 2 Private function: filter by Note Type
    const filterByNoteTypes = (items, filter) => {
        const tempValues = filter?.map(x => x.value);
        if (tempValues && tempValues.length > 0) {
            return items.filter(x => tempValues.includes(x.CategoryName));
        }
        return items;
    };

    // 2 Private function: filter by Note Type - variation
    const filterByNoteTypes2 = (items, filter) => {
        const tempValues = filter?.map(x => x.value);
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
    const filterByText = (items, filter) => {
        if (filter && filter !== "") {
            const searchedBy = ["Note", "CreatedBy", "ModifiedBy"];
            return items.filter(x =>
                searchedBy.some(key =>
                    x[key].toLowerCase().includes(filter.toLowerCase())
                )
            );
        }
        return items;
    };

    // 3 Private function: filter by Text
    const filterByText2 = (items, filter) => {
        if (filter && filter !== "") {
            const filterText = filter.toLowerCase();
            return items.filter(x =>
                x.Notes.some(
                    note =>
                        x.ProductDescription.toLowerCase().includes(
                            filterText
                        ) ||
                        (x.Marks === null
                            ? false
                            : x.Marks.toLowerCase().includes(filterText)) ||
                        note.Note.toLowerCase().includes(filterText) ||
                        note.CreatedBy.toLowerCase().includes(filterText) ||
                        note.ModifiedBy.toLowerCase().includes(filterText)
                )
            );
        }
        return items;
    };

    // 4 Private function: filter by Tags
    const filterByTags = (items, filter) => {
        const tempValues = filter?.map(x => x.value);
        if (tempValues && tempValues.length > 0) {
            const filteredItemTags = new Set(tags.itemsTags
                .filter(x => tempValues.includes(x.Description))
                .map(x => x.QuoteItemID));
            return items.filter(x => filteredItemTags.has(x.QuoteItemID));
        }
        return items;
    };

    // 5 Private function: filter by Item Groupings
    const filterByItemGroupings = (items, filter, tags) => {
        if (filter && filter.length > 0) {
            const set1 = tags.productItemTags
                .filter(x => itemGroupingsValues.includes(x.Description))
                .map(x => x.QuoteItemID);

            if (filter.includes("All Others")) {
                const allGroupedItems = new Set(tags.productItemTags.map(
                    x => x.QuoteItemID
                ));
                const set2 = items
                    .filter(x => !allGroupedItems.has(x.QuoteItemID))
                    .map(x => x.QuoteItemID);
                return [...set1, ...set2];
            }
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
        const items3 = filterByNoteTypes2(items2, filter.noteTypes);
        // Filter by Text
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
