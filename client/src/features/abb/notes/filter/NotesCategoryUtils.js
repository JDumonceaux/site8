/**
 * Returns a sorted, unique list of note types from data.
 */
export const getNoteTypes = (data) => {
    if (!Array.isArray(data)) return [];
    // Sort by ID
    const sorted = [...data].sort((a, b) => a.ID - b.ID);
    // Use a Set for uniqueness
    const seen = new Set();
    const noteTypes = [];
    for (const category of sorted) {
        if (category && category.Name && !seen.has(category.Name)) {
            seen.add(category.Name);
            noteTypes.push({ value: category.Name });
        }
    }
    return noteTypes;
};

