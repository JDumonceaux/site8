import React from "react";
import { FormatCurrency } from "react-globalize";

// Hide/show columns based on user's preferences - changed in Settings
const isColumnVisible = (userSelectedColumns, key) => {
    if (key === "showAlways") {
        return true; // Always show this column
    }
    const item = userSelectedColumns
        ? userSelectedColumns.find(x => x.key === key)
        : null;
    // Value is true if the column is visible, false if hidden
    return item ? item.value : true;
};

const useTable = () => {

    // Filter the columns based on user's preferences
    const getFilteredColumns = (userSelectedColumns, defaultColumns) => {
        const returnValue = defaultColumns.filter(x =>
            isColumnVisible(userSelectedColumns, x.key)
        );
        // Return just the column ids
        return returnValue.map(x => x.id);
    };

    return {
        getFilteredColumns,
        isColumnVisible
    };
};

export default useTable;
