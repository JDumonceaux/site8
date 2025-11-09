import { useCallback, useEffect, useRef, useState } from "react";

const useDebounceSearch = (initialValue, onSearch, delay = 300, minLength = 2) => {
    const [searchText, setSearchText] = useState(initialValue || "");
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        setSearchText(initialValue || "");
    }, [initialValue]);

    const handleSearch = useCallback((value) => {
        setSearchText(value);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (value.length >= minLength) {
            timeoutRef.current = setTimeout(() => {
                onSearch(value);
            }, delay);
        } else if (value.length === 0) {
            onSearch("");
        }
    }, [onSearch, delay, minLength]);

    return { handleSearch, searchText };
};

export default useDebounceSearch;