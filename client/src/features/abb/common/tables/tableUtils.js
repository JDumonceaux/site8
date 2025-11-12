const isColumnVisible = (userSelectedColumns, key) => {
    if (key === 'showAlways') {
        return true;
    }

    if (!userSelectedColumns) {
        return true;
    }

    const item = userSelectedColumns.find((x) => x.key === key);
    return item ? item.value : true;
};

export const getFilteredColumns = (userSelectedColumns, defaultColumns) => {
    if (!defaultColumns) {
        return [];
    }

    return defaultColumns
        .filter((x) => isColumnVisible(userSelectedColumns, x.key))
        .map((x) => x.id);
};

export { isColumnVisible };
