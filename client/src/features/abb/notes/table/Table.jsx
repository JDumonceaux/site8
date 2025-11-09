import React from 'react';
import { connect } from 'react-redux';

import { reorderQuoteNotes } from 'actions/QuoteActions';
import { msgFormatter } from 'app/util';
import WindowScrollTable from 'empower-components/WindowScrollTable';
import GridDate from 'wwwroot/feature/common/tables/GridDate';
import GridNameDate from 'wwwroot/feature/common/tables/GridNameDate';
import GridOverflow from 'wwwroot/feature/common/tables/GridOverflow';
import GridRight from 'wwwroot/feature/common/tables/GridRight';
import ActionsMenu from './ActionsMenu';
import getDataDisplay from './dataDisplay';
import getTableColumns from './tableColumns';

const Table = ({ fetchingDocuments, items, reorderQuoteNotes }) => {
  const handleReorder = (newOrder) => {
    reorderQuoteNotes(
      newOrder.map((item) => item.NoteID),
      items[0].QuoteID,
      items[0].QuoteItemID,
      items[0].NoteCategoryID,
    );
  };

  const noteColumnTitle =
    items && items.length > 0 && items[0].CategoryName
      ? items[0].CategoryName
      : msgFormatter('notes')();

  const filteredColumns = getTableColumns([]);
  const columnTypes = [];
  for (const item of filteredColumns) {
    switch (item) {
      case 'actions': {
        columnTypes.push({
          cell: ({ row }) => (
            <GridRight>
              <ActionsMenu item={row.original} />
            </GridRight>
          ),
          enableSorting: false,
          id: 'actions',
          size: 50,
        });
        break;
      }
      case 'createdBy': {
        columnTypes.push({
          accessorKey: 'Author',
          cell: (property) => (
            <GridNameDate
              hideDate
              type="createdInfo"
            >
              {property.row.original}
            </GridNameDate>
          ),
          enableSorting: false,
          header: () => msgFormatter('createdBy')(),
          id: 'createdBy',
        });
        break;
      }
      case 'createdOn': {
        columnTypes.push({
          accessorKey: 'CreatedDate',
          cell: ({ getValue }) => {
            return <GridDate>{getValue()}</GridDate>;
          },
          enableSorting: false,
          header: () => msgFormatter('createdOn')(),
          id: 'createdOn',
        });
        break;
      }
      case 'modifiedBy': {
        columnTypes.push({
          accessorKey: 'Author',
          cell: (property) => (
            <GridNameDate
              hideDate
              type="modifiedInfo"
            >
              {property.row.original}
            </GridNameDate>
          ),
          enableSorting: false,
          header: () => msgFormatter('modifiedBy')(),
          id: 'modifiedBy',
        });
        break;
      }
      case 'modifiedOn': {
        columnTypes.push({
          accessorKey: 'ModifiedDate',
          cell: ({ getValue }) => {
            return <GridDate>{getValue()}</GridDate>;
          },
          enableSorting: false,
          header: () => msgFormatter('modifiedOn')(),
          id: 'modifiedOn',
        });
        break;
      }
      case 'note': {
        columnTypes.push({
          accessorKey: 'Note',
          cell: ({ getValue }) => {
            return (
              <GridOverflow
                maxWidth="500"
                text={getValue() || ''}
              >
                {getValue() || ''}
              </GridOverflow>
            );
          },
          enableSorting: false,
          header: noteColumnTitle,
          id: 'note',
          size: 200,
        });
        break;
      }
      default: {
        throw new Error(`Column (${item}) is not defined`);
      }
    }
  }

  const dataDisplay = getDataDisplay(items);

  return (
    <WindowScrollTable
      keepTableWidthStable
      emptyItemsMessage={msgFormatter('noDataToDisplay')()}
      fetchingItems={fetchingDocuments}
      items={dataDisplay}
      columnTypes={columnTypes}
      enableRowDragAndDrop={dataDisplay.length > 1}
      enableSorting={false}
      onRowOrderChange={handleReorder}
    />
  );
};

const mapStateToProps = (state) => ({
  fetchingDocuments: state.DocumentWizard.fetchingProposals,
});

export default connect(mapStateToProps, {
  reorderQuoteNotes,
})(Table);
