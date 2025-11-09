import useTable from "wwwroot/feature/common/tables/useTable";

const DEFAULT_COLUMNS = [
    { id: "note", key: "showAlways" },
    { id: "createdBy", key: "showAlways" },
    { id: "createdOn", key: "showAlways" },
    { id: "modifiedBy", key: "showAlways" },
    { id: "modifiedOn", key: "showAlways" },
    { id: "actions", key: "showAlways" }
];

export const getTableColumns = colList => {
    const { getFilteredColumns } = useTable();
    return getFilteredColumns(colList, DEFAULT_COLUMNS);
};

export default getTableColumns;
