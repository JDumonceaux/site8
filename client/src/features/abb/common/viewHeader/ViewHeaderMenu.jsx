import React from 'react';
import { FormatMessage } from 'react-globalize';
import { NavLink, useLocation } from 'react-router-dom';

import { msgFormatter } from 'app/util';
import SectionsBar from 'empower-components/SectionsBar';
import usePermissionContext from 'wwwroot/feature/common/usePermissionContext';

const handleSectionClick = () => {
  /* empty */
};

const ViewHeaderMenu = ({ appData, data, match }) => {
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

  let routePath = `${
    appData.configuration.EmpowerURL + globalThis.location.pathname
  }#${match.url}`;

  if (globalThis.location.host === 'localhost') {
    routePath = `${appData.configuration.EmpowerURL}#${match.url}`;
  }

  const routePathT =
    match.url.slice(-1) === '/' ? match.url.slice(0, -1) : match.url;
  const quote = data.currentQuote;

  let sections = [
    { exact: true, key: 'details', name: 'Details', route: routePathT },
    {
      key: 'notes',
      name: 'Notes',
      route: `${routePathT}/notes`,
    },
  ];

  if (quote && quote.QuoteItems && quote.QuoteItems.length > 0) {
    if (isHistoryRole) {
      // Use toSpliced when we can target ES2023
      // eslint-disable-next-line no-restricted-properties
      sections.splice(1, 0, {
        key: 'history',
        name: 'History',
        route: `${routePathT}/history`,
      });
    }
    if (isRebatesRole) {
      sections.splice(1, 0, {
        key: 'rebates',
        name: 'Rebates',
        route: `${routePathT}/rebates`,
      });
    }
    if (isOrdersRole) {
      sections.splice(1, 0, {
        key: 'orders',
        name: 'Orders',
        route: `${routePathT}/orders`,
      });
    }
    if (isDocumentsRole) {
      let documentsRouteValue = 'proposals';
      if (!isDocWizardRole) {
        documentsRouteValue = 'proposal';
      }
      sections.splice(1, 0, {
        key: 'documents',
        name: 'Documents',
        route: `${routePathT}/${documentsRouteValue}`,
      });
    }

    sections.splice(1, 0, {
      key: 'billOfMaterialsAbbrev',
      name: 'BOM',
      route: `${routePathT}/bom`,
    });
    if (isCostFCMRole) {
      sections.splice(1, 0, {
        key: 'cost',
        name: 'Cost',
        route: `${routePathT}/cost`,
      });
    }
    if (isPricingRole && appData.configuration.Pricing) {
      const priceWarning =
        data.priceValidationData && !data.priceValidationData.Valid ? (
          <i
            className="fal fa-exclamation-triangle label-red"
            style={{ fontSize: '13px' }}
            title={msgFormatter('pricingIssuesExist')()}
          />
        ) : null;
      sections.splice(1, 0, {
        key: 'pricing',
        name: 'Pricing',
        route: `${routePathT}/pricing`,
        warningIcon: priceWarning,
      });
    }
  }

  sections = sections.map((section) => {
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
          <FormatMessage path={section.key}>{section.name}</FormatMessage>
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
      handleSectionClick={handleSectionClick}
      sections={sections}
      showPanel={appData.showPanel}
    />
  );
};

export default ViewHeaderMenu;
