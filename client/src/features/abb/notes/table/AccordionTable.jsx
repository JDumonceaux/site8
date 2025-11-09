import React from 'react';

import { msgFormatter } from 'app/util';
import groupBy from 'lodash/groupBy';
import Accordion from '../../common/containers/Accordion';
import Table from './Table';

const AccordionTable = ({ defaultOpen = false, items, type }) => {
  switch (type) {
    case 'itemLevel': {
      return (
        <>
          {items.map((x) => {
            const length = x?.Notes?.length ? `(${x?.Notes?.length})` : '';
            const title = `${x.Sequence} - ${x.ProductDescription} ${
              x.Marks ? ` | ${x.Marks}` : ''
            } ${length}`.trim();

            const groupedNotes = Object.values(
              groupBy(x.Notes, 'NoteCategoryID'),
            );
            return groupedNotes.length > 0 ? (
              <Accordion
                key={x.QuoteItemID}
                defaultOpen={defaultOpen}
                title={title}
              >
                {groupedNotes.map((noteGroup) => (
                  <Table
                    key={noteGroup[0]?.NoteCategoryID || noteGroup[0]?.NoteID}
                    items={noteGroup}
                  />
                ))}
              </Accordion>
            ) : null;
          })}
        </>
      );
    }
    case 'productFamily': {
      return (
        <>
          {items.map((x) => {
            const groupedNotes = Object.values(groupBy(x, 'NoteCategoryID'));
            const title = `${
              x[0].ProductFamily || msgFormatter('unknown')()
            }  (${x.length})`;
            const productFamily = x[0].ProductFamily || 'unknown';
            return groupedNotes.length > 0 ? (
              <Accordion
                key={productFamily}
                defaultOpen={defaultOpen}
                title={title}
              >
                {groupedNotes.map((noteGroup) => (
                  <Table
                    key={noteGroup[0]?.NoteCategoryID || noteGroup[0]?.NoteID}
                    items={noteGroup}
                  />
                ))}
              </Accordion>
            ) : null;
          })}
        </>
      );
    }
    default: {
      const title = `${msgFormatter('quote')()} (${items.length})`;
      return (
        <>
          {items?.length > 0 ? (
            <Accordion
              defaultOpen={defaultOpen}
              title={title}
            >
              <Table items={items} />
            </Accordion>
          ) : null}
        </>
      );
    }
  }
};

export default AccordionTable;
