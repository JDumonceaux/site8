import { useCallback, useMemo, useState } from "react";

const useFilterBar = (config) => {
    const {
        includeCount = false,
        initialValues = [],
        items = [],
        keyName
    } = config;

    const [selectedValues, setSelectedValues] = useState(initialValues);

    const options = useMemo(() => {
        if (!Array.isArray(items) || items.length === 0) {
            return [];
        }

        const uniqueValues = [...new Set(
            items
                .filter(item => item && item[keyName] !== undefined && item[keyName] !== null)
                .map(item => item[keyName])
        )];

        return uniqueValues.map(value => ({
            label: String(value),
            value
        }));
    }, [items, keyName]);

    const optionsWithCount = useMemo(() => {
        if (!Array.isArray(items) || items.length === 0) {
            return [];
        }

        const countMap = items.reduce((accumulator, item) => {
            if (item && item.value !== undefined && typeof item.count === 'number') {
                accumulator[item.value] = (accumulator[item.value] || 0) + item.count;
            }
            return accumulator;
        }, {});

        return Object.entries(countMap).map(([value, count]) => ({
            label: `${value} (${count})`,
            value
        }));
    }, [items]);

    const handleChange = useCallback((value) => {
        setSelectedValues(Array.isArray(value) ? value : []);
    }, []);

    const handleClear = useCallback(() => {
        setSelectedValues([]);
    }, []);

    return {
        handleChange,
        handleClear,
        hasSelections: selectedValues.length > 0,
        options: includeCount ? optionsWithCount : options,
        selectedValues,
        selectionCount: selectedValues.length
    };
};

export default useFilterBar;

// Usage:
// const filter = useFilterBar({
//   items: data,
//   keyName: 'category',
//   includeCount: true
// });
