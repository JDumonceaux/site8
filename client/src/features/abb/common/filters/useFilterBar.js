import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from "react";

const useFilterBar = config => {
    const {
        includeCount = false,
        initialValues = [],
        items = [],
        keyName = "value"
    } = config;

    const [selectedValues, setSelectedValues] = useState(initialValues);

    useEffect(() => {
        setSelectedValues(initialValues);
    }, [initialValues]);

    const getConsolidatedWithCount = () => {
        if (!Array.isArray(items) || items.length === 0) {
            return [];
        }
        const countMap = [];
        for (const item of items) {
            const value = item[keyName];
            if (value !== undefined && value !== null) {
                const count = item.count || 1;
                const temp = countMap.find(v => v.value === value);
                if (temp) {
                    temp.count += count;
                } else {
                    countMap.push({ count, value });
                }
            }
        }
        return countMap;
    };


    const getOptions = useMemo(() => {
        const temp = getConsolidatedWithCount();
        return temp.map(x => ({
            label: x.value,
            value: x.value
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(items), keyName]);

    const getOptionsWithCount = useMemo(() => {
        const temp = getConsolidatedWithCount();
        return temp.map(x => ({
            label: `${x.value} (${x.count})`,
            value: x.value
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(items), keyName]);

    const handleChange = useCallback(value => {
        setSelectedValues(Array.isArray(value) ? value : []);
    }, []);

    const handleClear = useCallback(() => {
        setSelectedValues([]);
    }, []);

    // Calculate total count for selected values
    const totalSelectedCount = useMemo(() => {
        if (!Array.isArray(selectedValues) || !Array.isArray(items)) return 0;
        return selectedValues.reduce((sum, val) => {
            const found = items.find(item => item[keyName] === val);
            return sum + (found && found.count ? found.count : 1);
        }, 0);
    }, [selectedValues, items, keyName]);

    return {
        count: totalSelectedCount,
        handleChange,
        handleClear,
        hasSelections: selectedValues?.length > 0,
        options: includeCount ? getOptionsWithCount : getOptions,
        selectedValues
    };
};

useFilterBar.propTypes = {
    config: PropTypes.shape({
        includeCount: PropTypes.bool,
        initialValues: PropTypes.arrayOf(PropTypes.any),
        items: PropTypes.arrayOf(PropTypes.object),
        keyName: PropTypes.string,
    }),
};

export default useFilterBar;

// Usage:
// const filter = useFilterBar({
//   items: data,
//   keyName: 'category',
//   includeCount: true
// });
