import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import Lessonly from 'app/lessonlyIntg';
import { msgFormatter } from 'app/util';
import {
  ContentSection,
  SubSection,
  SubSectionContent,
} from 'empower-components/ContentSection';
import ScrollToTop from 'wwwroot/feature/common/ScrollToTop';
import ViewSubHeader from 'wwwroot/feature/common/viewSubHeader/ViewSubHeader';
import ViewHeader from 'wwwroot/feature/notes/header/ViewHeader';
import ItemFilter from './filter/ItemFilter';
import useFiltering from './filter/useFiltering';
import ViewMenu from './menu/ViewMenu';
import AccordionTable from './table/AccordionTable';

const defaultFilter = {
  itemGroupings: [],
  noteTypes: [],
  productFamily: [],
  tags: [],
  text: '',
};

const NotesView = ({ quote, tags }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(defaultFilter);
  const { filteredItems, hasFilter } = useFiltering(quote, currentFilter, tags);
  const {
    filteredItemsWithNotes,
    filteredProductFamilyNotes,
    filteredQuoteNotes,
  } = filteredItems;

  const handleFilterChange = useCallback((value) => {
    setCurrentFilter(value);
  }, []);

  const notesSections = useMemo(
    () => [
      { items: filteredQuoteNotes, key: 'quote', type: undefined },
      {
        items: filteredProductFamilyNotes,
        key: 'productFamily',
        type: 'productFamily',
      },
      { items: filteredItemsWithNotes, key: 'itemLevel', type: 'itemLevel' },
    ],
    [filteredQuoteNotes, filteredProductFamilyNotes, filteredItemsWithNotes],
  );

  return (
    <>
      {/* Page Header */}
      <ContentSection pageHeader>
        <ViewHeader />
      </ContentSection>
      <ContentSection>
        {/* Page Title */}
        <ViewSubHeader
          rightDiv={
            <ViewMenu
              hasFilter={hasFilter}
              onShowFilter={() => setShowFilter((prev) => !prev)}
            />
          }
          title={msgFormatter('notes')()}
        />
        {/* Filter */}
        <SubSection>
          <SubSectionContent>
            <ItemFilter
              onChange={handleFilterChange}
              show={showFilter}
            />
          </SubSectionContent>
        </SubSection>
        <SubSection>
          <SubSectionContent>
            {/* Tables */}
            {notesSections.map((section) => (
              <AccordionTable
                key={section.key}
                defaultOpen
                items={section.items}
                type={section.type}
              />
            ))}
          </SubSectionContent>
        </SubSection>
      </ContentSection>
      <ScrollToTop />
    </>
  );
};

const NotesViewContainer = ({ quote, tags }) => {
  useEffect(() => {
    Lessonly.setKeywords(['quoteNote']);
    return () => {
      // Optional cleanup if needed
    };
  }, []);

  return (
    <NotesView
      tags={tags}
      quote={quote}
    />
  );
};

const mapStateToProps = (state) => ({
  quote: state.Quote.currentQuote,
  tags: state.Quote.tags,
});

export default connect(mapStateToProps)(NotesViewContainer);
