import React from "react";

import ToggleOption from "./ToggleOption";

const ToggleOptions = ({ items }) => {
    if (!items || items.length === 0) {
        return null;
    }

    const modifiedItems = items.map(item => {
        if (item.id === undefined) {
            throw new Error(`Id is not defined: ${item.path}`);
        }
        return {
            ...item,
            key: item.key === undefined ? item.id : item.key
        };
    });

    return modifiedItems.map(item => (
      <ToggleOption key={item.key} item={item} />
    ));
};

export default ToggleOptions;
