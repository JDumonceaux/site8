import React from 'react';
import { connect } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { msgFormatter } from 'app/util';
import SectionsBar from 'empower-components/SectionsBar';
import usePermissionContext from 'wwwroot/feature/common/usePermissionContext';

const HeaderMenu = ({
  appData,
  configuration,
  match,
  priceValidation,
  quote,
}) => {
  const {
    isCostFCMRole,
    isDocumentsRole,
    isDocWizardRole,
    isHistoryRole,
    isOrdersRole,
    isPricingRole,
    isRebatesRole,
  } = usePermissionContext();
  const location = useLocation();

  const handleSection = (_section) => {
    // No action needed, NavLink handles the routing
  };

  const routePathT =
    match.url.slice(-1) === '/' ? match.url.slice(0, -1) : match.url;

  const hasQuoteItems = quote?.QuoteItems && quote.QuoteItems.length > 0;

  const priceWarning =
    priceValidation && !priceValidation.Valid ? (
      <i
        className="fal fa-exclamation-triangle label-red"
        style={{ fontSize: '13px' }}
        title={msgFormatter('pricingIssuesExist')()}
      />
    ) : null;

  // Build the menu items
  const sections = [
    {
      exact: true,
      key: 'details',
      name: 'Details',
      route: routePathT,
    },
    {
      isEnabled: hasQuoteItems && isPricingRole && configuration.Pricing,
      key: 'pricing',
      name: 'Pricing',
      route: `${routePathT}/pricing`,
      warningIcon: priceWarning,
    },
    {
      isEnabled: hasQuoteItems && isCostFCMRole,
      key: 'cost',
      name: 'Cost',
      route: `${routePathT}/cost`,
    },
    {
      isEnabled: hasQuoteItems,
      key: 'billOfMaterialsAbbrev',
      name: 'BOM',
      route: `${routePathT}/bom`,
    },
  ];

  // Details is always shown
  const documentsRouteValue = isDocWizardRole ? 'proposal2' : 'proposal';
  sections.push(
    {
      isEnabled: hasQuoteItems && isDocumentsRole,
      key: 'documents',
      name: 'Documents',
      route: `${routePathT}/${documentsRouteValue}`,
    },
    {
      isEnabled: hasQuoteItems && isOrdersRole,
      key: 'orders',
      name: 'Orders',
      route: `${routePathT}/orders`,
    },
    {
      isEnabled: hasQuoteItems && isRebatesRole,
      key: 'rebates',
      name: 'Rebates',
      route: `${routePathT}/rebates`,
    },
    {
      isEnabled: hasQuoteItems && isHistoryRole,
      key: 'history',
      name: 'History',
      route: `${routePathT}/history`,
    },
    {
      key: 'notes',
      name: 'Notes',
      route: `${routePathT}/notes`,
    },
  );

  const filteredSection = sections.filter(
    (section) => section.isEnabled !== false,
  );

  // Format the items for the menu component
  const menuItems = filteredSection.map((section) => {
    return {
      ...section,
      component: (
        <NavLink
          activeClassName="active"
          exact={section.exact}
          to={`${section.route}`}
        >
          {section.warningIcon ? section.warningIcon : null}
          <span> </span>
          {msgFormatter(section.key)()}
        </NavLink>
      ),
    };
  });

  const activeSection =
    location.pathname.split('/')[3] === undefined
      ? 'details'
      : location.pathname.split('/')[3];

  return (
    <SectionsBar
      activeSection={activeSection}
      handleSectionClick={handleSection}
      sections={menuItems}
      showPanel={appData.showPanel}
    />
  );
};

const HeaderMenuContainer = (props) => <HeaderMenu {...props} />;

const mapStateToProps = (state) => ({
  appData: state.Quote,
  configuration: state.App.configuration,
  data: state.QuoteManagement,
  priceValidation: state.Quote.priceValidationData,
  quote: state.Quote.currentQuote,
});

export default connect(mapStateToProps)(HeaderMenuContainer);
