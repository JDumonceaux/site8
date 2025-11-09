import React, { useCallback } from 'react';

import { msgFormatter } from 'app/util';
import styled from 'styled-components';
import IconsMenuItem from './IconsMenuItem';

export const MenuItemType = {
  AddCatalog: 'addCatalog',
  AddGroup: 'addGroup',
  Archive: 'archive',
  Attachments: 'attachments',
  CloseQuote: 'close_quote',
  Configuration_Configure: 'configuration_configure',
  Configuration_Invalid: 'configuration_invalid',
  Configuration_Needs_Approval: 'configuration_needs_approval',
  Configuration_Reeng_Expired: 'configuration_reeng_expired',
  Configuration_Reeng_Expired_Ext: 'configuration_reeng_expired_ext',
  Configuration_Reeng_Sales_Org: 'configuration_reeng_sales_org',
  Configuration_Reeng_Sales_Org_Ext: 'configuration_reeng_sales_org_ext',
  Configuration_View: 'configuration_view',
  Copy: 'copy',
  Cost: 'cost',
  Delete: 'delete',
  Documents: 'documents',
  Download: 'download',
  Edit: 'edit',
  Excel: 'excel',
  File: 'file',
  Filter: 'filter',
  Image: 'image',
  ItemGroupings: 'itemGroupings',
  ManageBOM: 'manageBOM',
  ManagePricing: 'managePricing',
  Mods: 'mods',
  Move: 'move',
  Note: 'note',
  Notes: 'notes',
  OrderInfo: 'orderInfo',
  Pdf: 'pdf',
  QuickDownload: 'quickDownload',
  RecalcFCM: 'recalcFCM',
  Recipients: 'recipients',
  RecycleBin: 'recycleBin',
  ReEngineering: 'reEngineering',
  Refresh: 'refresh',
  Restore: 'restore',
  RiskReview: 'riskReview',
  SearchQuotes: 'search_quotes',
  Settings: 'settings',
  Share: 'share',
  Space: 'space',
  Spec: 'spec',
  Split: 'split',
  Table: 'table',
  Tags: 'tags',
  Transfer: 'transfer',
  Trash: 'trash',
  Versions: 'versions',
};

const IconsMenu = ({
  display = 'horizontal',
  includeLI = true,
  includeUL = true,
  items,
}) => {
  const getDefaultProps = useCallback((item) => {
    const defaultProps = (() => {
      switch (item.type) {
        case MenuItemType.AddCatalog: {
          return {
            icon: <i className="fal fa-plus" />,
            text: msgFormatter('addCatalog')(),
            toolTip: msgFormatter('addCatalog')(),
          };
        }
        case MenuItemType.AddGroup: {
          return {
            icon: <i className="fal fa-sitemap" />,
            text: msgFormatter('addGroup')(),
            toolTip: msgFormatter('addGroup')(),
            toolTipDisabled: msgFormatter('groupLimit')(),
          };
        }
        case MenuItemType.Archive: {
          return {
            icon: <i className="fal fa-archive" />,
            text: msgFormatter('archive')(),
            toolTip: msgFormatter('archive')(),
          };
        }
        case MenuItemType.Attachments: {
          return {
            icon: <i className="fal fa-paperclip" />,
            text: msgFormatter('attachments')(),
            toolTip: msgFormatter('attachments')(),
          };
        }
        case MenuItemType.CloseQuote: {
          return {
            icon: <i className="fal fa-window-close" />,
            text: msgFormatter('closeQuote')(),
            toolTip: msgFormatter('closeQuote')(),
            toolTipDisabled: msgFormatter('makeSelectionFirst')(),
          };
        }
        case MenuItemType.Configuration_Configure: {
          return {
            icon: <i className="fal fa-wrench" />,
            text: msgFormatter('configure')(),
            toolTip: msgFormatter('configure')(),
          };
        }
        case MenuItemType.Configuration_Invalid: {
          return {
            icon: <i className="fal fa-wrench" />,
            status: 4,
            text: msgFormatter('configure')(),
            toolTip: msgFormatter('invalidConfiguration')(),
          };
        }
        case MenuItemType.Configuration_Needs_Approval: {
          return {
            icon: <i className="fal fa-wrench" />,
            status: 3,
            text: msgFormatter('configure')(),
            toolTip: msgFormatter('configurationNeedsApproval')(),
          };
        }
        case MenuItemType.Configuration_Reeng_Expired: {
          return {
            icon: <i className="fal fa-wrench" />,
            status: 3,
            text: msgFormatter('configure')(),
            toolTip: msgFormatter('configurationNeedsReEngineeringExpired')(),
          };
        }
        case MenuItemType.Configuration_Reeng_Expired_Ext: {
          return {
            icon: <i className="fal fa-pencil" />,
            status: 3,
            text: msgFormatter('configure')(),
            toolTip: msgFormatter('configurationNeedsReEngineeringExpired')(),
          };
        }
        case MenuItemType.Configuration_Reeng_Sales_Org: {
          return {
            icon: <i className="fal fa-wrench" />,
            status: 3,
            text: msgFormatter('configure')(),
            toolTip: msgFormatter('configurationNeedsReEngineeringSalesOrg')(),
          };
        }
        case MenuItemType.Configuration_Reeng_Sales_Org_Ext: {
          return {
            icon: <i className="fal fa-pencil" />,
            status: 3,
            text: msgFormatter('configure')(),
            toolTip: msgFormatter('configurationNeedsReEngineeringSalesOrg')(),
          };
        }
        case MenuItemType.Configuration_View: {
          return {
            icon: <i className="fal fa-wrench" />,
            text: msgFormatter('viewConfiguration')(),
            toolTip: msgFormatter('viewConfiguration')(),
          };
        }
        case MenuItemType.Copy: {
          return {
            icon: <i className="fal fa-clone" />,
            text: msgFormatter('copy')(),
            toolTip: msgFormatter('copy')(),
            toolTipDisabled: msgFormatter('makeSelectionFirst')(),
          };
        }
        case MenuItemType.Cost: {
          return {
            icon: <i className="fal fa-money-bill-alt" />,
            text: msgFormatter('costDetails')(),
            toolTip: msgFormatter('costDetails')(),
          };
        }
        case MenuItemType.Delete: {
          return {
            icon: <i className="fal fa-trash" />,
            text: msgFormatter('delete')(),
            toolTip: msgFormatter('delete')(),
          };
        }
        case MenuItemType.Documents: {
          return {
            icon: <i className="fal fa-file-alt" />,
            text: msgFormatter('documents')(),
            toolTip: msgFormatter('documents')(),
          };
        }
        case MenuItemType.Download: {
          return {
            icon: <i className="fal fa-download" />,
            text: msgFormatter('download')(),
            toolTip: msgFormatter('download')(),
          };
        }
        case MenuItemType.Edit: {
          return {
            icon: <i className="fal fa-pencil" />,
            text: msgFormatter('edit')(),
            toolTip: msgFormatter('edit')(),
          };
        }
        case MenuItemType.Excel: {
          return {
            icon: <i className="fal fa-file-excel" />,
            text: msgFormatter('excel')(),
            toolTip: msgFormatter('excel')(),
          };
        }
        case MenuItemType.File: {
          return {
            icon: <i className="fal fa-file-alt" />,
            text: msgFormatter('file')(),
            toolTip: msgFormatter('file')(),
          };
        }
        case MenuItemType.Filter: {
          return {
            icon: <i className="fal fa-filter" />,
            iconActive: <i className="fas fa-filter" />,
            text: msgFormatter('filter')(),
            toolTip: msgFormatter('filter')(),
          };
        }
        case MenuItemType.Image: {
          return {
            icon: <i className="fal fa-image" />,
            text: msgFormatter('drawingsOnly')(),
          };
        }
        case MenuItemType.ItemGroupings: {
          return {
            icon: <i className="fal fa-sitemap" />,
            text: msgFormatter('itemGroupings')(),
            toolTip: msgFormatter('itemGroupings')(),
          };
        }
        case MenuItemType.ManageBOM: {
          return {
            icon: <i className="fal fa-folder-open" />,
            text: msgFormatter('manageBOMDoc')(),
            toolTip: msgFormatter('manageBOMDoc')(),
          };
        }
        case MenuItemType.ManagePricing: {
          return {
            icon: <i className="fal fa-folder-open" />,
            text: msgFormatter('managePricingDoc')(),
            toolTip: msgFormatter('managePricingDoc')(),
          };
        }
        case MenuItemType.Mods: {
          return {
            icon: <i className="fal fa-list-alt" />,
            text: msgFormatter('modifications')(),
            toolTip: msgFormatter('modifications')(),
            toolTipDisabled: msgFormatter('modTitle')(),
          };
        }
        case MenuItemType.Move: {
          return {
            icon: <i className="fal fa-arrows-v" />,
            text: msgFormatter('move')(),
            toolTip: msgFormatter('move')(),
            toolTipDisabled: msgFormatter('makeSelectionFirst')(),
          };
        }
        case MenuItemType.Note: {
          return {
            icon: <i className="fal fa-file-plus" />,
            text: msgFormatter('addNote')(),
            toolTip: msgFormatter('addNote')(),
          };
        }
        case MenuItemType.Notes: {
          return {
            icon: <i className="fal fa-comment-dots" />,
            text: msgFormatter('viewNotes')(),
            toolTip: msgFormatter('view')(),
          };
        }
        case MenuItemType.OrderInfo: {
          return {
            icon: <i className="fal fa-box-alt" />,
            text: msgFormatter('itemOrderInfo')(),
            toolTip: msgFormatter('itemOrderInfo')(),
          };
        }
        case MenuItemType.Pdf: {
          return {
            icon: <i className="fal fa-file-pdf" />,
            text: msgFormatter('pdf')(),
            toolTip: msgFormatter('pdf')(),
          };
        }
        case MenuItemType.QuickDownload: {
          return {
            icon: <i className="fal fa-download" />,
            text: msgFormatter('quickDownload')(),
            toolTip: msgFormatter('quickDownload')(),
            toolTipDisabled: msgFormatter('makeSelectionFirst')(),
          };
        }
        case MenuItemType.RecalcFCM: {
          return {
            icon: <i className="fal fa-arrow-rotate-right" />,
            toolTip: msgFormatter('recalcFCM')(),
          };
        }
        case MenuItemType.Recipients: {
          return {
            icon: <i className="fal fa-users" />,
            text: msgFormatter('recipient')(),
            toolTip: msgFormatter('recipient')(),
          };
        }
        case MenuItemType.RecycleBin: {
          return {
            icon: (
              <span className="fa-stack stack-container">
                <i className="fal fa-trash fa-stack-1x" />
                <i className="far fa-recycle stacked-icon" />
              </span>
            ),
            text: msgFormatter('recycleBin')(),
            toolTip: msgFormatter('recycleBin')(),
          };
        }
        case MenuItemType.ReEngineering: {
          return {
            icon: <i className="fal fa-sync-alt" />,
            text: msgFormatter('reengineering')(),
            toolTip: msgFormatter('reengineering')(),
            toolTipDisabled: msgFormatter('makeSelectionFirst')(),
          };
        }
        case MenuItemType.Refresh: {
          return {
            icon: <i className="fal fa-sync" />,
            text: msgFormatter('refresh')(),
            toolTip: msgFormatter('refresh')(),
          };
        }
        case MenuItemType.Restore: {
          return {
            icon: <i className="fal fa-inbox" />,
            text: msgFormatter('restore')(),
            toolTip: msgFormatter('restore')(),
          };
        }

        case MenuItemType.RiskReview: {
          return {
            icon: <i className="fal fa-file-excel" />,
            text: msgFormatter('riskReview')(),
            toolTip: msgFormatter('riskReview')(),
          };
        }
        case MenuItemType.SearchQuotes: {
          return {
            icon: <i className="fal fa-search" />,
            text: msgFormatter('searchQuotes')(),
            toolTip: msgFormatter('searchQuotes')(),
          };
        }
        case MenuItemType.Settings: {
          return {
            icon: <i className="fal fa-cog" />,
            text: msgFormatter('settings')(),
            toolTip: msgFormatter('settings')(),
          };
        }
        case MenuItemType.Share: {
          return {
            icon: <i className="fal fa-user-plus" />,
            toolTip: msgFormatter('share')(),
          };
        }
        case MenuItemType.Space: {
          return {
            icon: <i className="" />,
          };
        }
        case MenuItemType.Spec: {
          return {
            icon: <i className="fal fa-file-alt" />,
            text: msgFormatter('specSheets')(),
            toolTip: msgFormatter('specSheets')(),
          };
        }
        case MenuItemType.Split: {
          return {
            icon: <i className="fal fa-flip-vertical fa-code-branch" />,
            text: msgFormatter('split')(),
            toolTip: msgFormatter('split')(),
          };
        }
        case MenuItemType.Table: {
          return {
            icon: <i className="fal fa-table" />,
          };
        }
        case MenuItemType.Tags: {
          return {
            icon: <i className="fal fa-tags" />,
            text: msgFormatter('tags')(),
            toolTip: msgFormatter('tags')(),
            toolTipDisabled: msgFormatter('tagLimit')(),
          };
        }
        case MenuItemType.Transfer: {
          return {
            icon: <i className="fal fa-handshake" />,
            text: msgFormatter('transfer')(),
            toolTip: msgFormatter('transfer')(),
          };
        }
        case MenuItemType.Trash: {
          return {
            icon: <i className="fal fa-trash" />,
            text: msgFormatter('delete')(),
            toolTip: msgFormatter('delete')(),
            toolTipDisabled: msgFormatter('makeSelectionFirst')(),
          };
        }
        case MenuItemType.Versions: {
          return {
            icon: <i className="fal fa-copy" />,
            text: msgFormatter('versions')(),
            toolTip: msgFormatter('versions')(),
          };
        }
        default: {
          throw new Error(`Unknown menu item type: ${item.type}`);
        }
      }
    })();

    // show = Icon is visible
    // isEnabled = Icon is clickable
    // isActive = Ex. Filtering is applied
    const isEnabled = item.isEnabled === undefined ? true : item.isEnabled;
    const show = item.show === undefined ? true : item.show;
    const toolTip = isEnabled
      ? item.toolTip || defaultProps.toolTip
      : item.toolTipDisabled || defaultProps.toolTipDisabled;

    return {
      align: item.showText && item.showText === true ? 'start' : 'center',
      badge: item.badge,
      badgeStatus: item.badgeStatus,
      children: item.children,
      count: item.count,
      icon:
        item.isActive && defaultProps.iconActive
          ? defaultProps.iconActive
          : defaultProps.icon,
      isEnabled,
      link: item.link,
      onClick: item.onClick,
      show,
      showText: !!(item.showText || item.text),
      status: item.status || 0,
      text: item.text || defaultProps.text,
      to: item.to,
      toolTip,
      type: item.type,
    };
  }, []);

  const updatedItems = Array.isArray(items)
    ? items
        .map((item, index) => ({
          ...getDefaultProps(item),
          key: item.key ?? item.id ?? index,
        }))
        .filter((item) => item.show)
    : [];

  // If no items are provided, return null to avoid rendering an empty list
  if (updatedItems.length === 0) {
    return null;
  }

  return (
    <>
      {includeUL ? (
        <StyledUL $display={display}>
          {updatedItems?.map((item) => (
            <IconsMenuItem
              key={item.key}
              includeLI={includeLI}
              item={item}
            />
          ))}
        </StyledUL>
      ) : (
        updatedItems?.map((item) => (
          <IconsMenuItem
            key={item.key}
            includeLI={includeLI}
            item={item}
          />
        ))
      )}
    </>
  );
};

IconsMenu.displayName = 'IconsMenu';
export default IconsMenu;

const StyledUL = styled.ul`
  display: ${({ $display }) => ($display === 'horizontal' ? 'flex' : 'block')};
  list-style: none;
  background: white;
  margin: 0;
  padding: 0;
`;
