export interface TransactionRaw {
  id: string | number;
  mbDate: string;
  inOutCode: number;
  assetId: string | number;
  payType: string;
  inOutType: string;
  mcid: number;
  mbCategory: string;
  mcscid: string | number;
  subCategory: string;
  mbContent: string;
  mbDetailContent: string;
  mbCash: number;
}
