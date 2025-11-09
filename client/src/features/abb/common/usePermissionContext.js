import { useContext } from "react";

import { PermissionContext } from "app/contexts/PermissionContext";

const usePermissionContext = () => {
    const permissionContext = useContext(PermissionContext);

    const isAppealPriceLinkRole = permissionContext.isInRole("AppealPriceLink");
    const isCostFCMRole = permissionContext.isInRole("CostFCM");
    const isCostRole = permissionContext.isInRole("Cost");
    // eslint-disable-next-line unicorn/prevent-abbreviations
    const isDocWizardRole = permissionContext.isInRole("DocWizard");
    const isDocumentsRole = permissionContext.isInRole("Documents");
    const isGetPriceLinkRole = permissionContext.isInRole("GetPriceLink");
    const isHistoryRole = permissionContext.isInRole("History");
    const isOrdersRole = permissionContext.isInRole("Orders");
    const isPricingRole = permissionContext.isInRole("Pricing");
    const isPriceAppealRole = permissionContext.isInRole("PriceAppeal");
    const isRebatesRole = permissionContext.isInRole("Rebates");
    const isReleaseManagementRole = permissionContext.isInRole("ReleaseManagement");
    const isShowSAPContractNumber = permissionContext.isInRole("ShowSAPContractNumber");

    return {
        isAppealPriceLinkRole,
        isCostFCMRole,
        isCostRole,
        isDocumentsRole,
        isDocWizardRole,
        isGetPriceLinkRole,
        isHistoryRole,
        isOrdersRole,
        isPriceAppealRole,
        isPricingRole,
        isRebatesRole,
        isReleaseManagementRole,
        isShowSAPContractNumber
    };
};

export default usePermissionContext;
