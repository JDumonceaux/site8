export interface ICase {
  caseNumber: string;
  caseStatus: string;
  dateTimeOpened?: Date;
  delayReason: string;
  deliveryDate?: string;
  deliveryWindowEnd?: Date;
  deliveryWindowStart?: Date;
  invoiceNumber?: string;
  issueType?: string;
  itemCodes?: string[];
  paperworkType?: string;
  requestType?: string;
  requesterFirstName?: string;
  requesterLastName?: string;
  revisedDeliveryWindowEnd?: string;
  revisedDeliveryWindowStart?: string;
  routeNumber?: string;
  invoicedItemNumber?: string;
  invoicedItemQuantity?: number;
  quantityReported?: number;
  unit?: string;
  invoicedUnit?: string;
  pack?: string;
}
