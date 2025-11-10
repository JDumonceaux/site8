// dataDisplay.js
// Private
const getItemDisplay = item => {
    if (!item) {
        return null;
    }

    return {
        ...item,
        CreatedEmail: item?.CreatedByEmail,
        CreatedUser: item?.CreatedBy,
        ModifiedEmail: item?.ModifiedByEmail,
        ModifiedUser: item?.ModifiedBy
    };
};

const getDataDisplay = items => {
    if (!items) return [];
    const dataArray = Array.isArray(items) ? items : [items];
    return dataArray.map(getItemDisplay);
};

export default getDataDisplay;
