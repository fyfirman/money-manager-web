export interface InitData {
  initStartDate: string;
  initEndDate: string;
  mbid: string;
  mbName: string;
}

export interface MultiBook {
  mbid: string;
  mbname: string;
  baseDate: string;
}

export interface Mcsc {
  mcscid: string;
  mcscname: string;
}

export interface IncomeCategory {
  mcid: string;
  mcname: string;
  mcsc: Mcsc[];
}

export interface ExpenseCategory {
  mcid: string;
  mcname: string;
  mcsc: Mcsc[];
}

export interface PayType {
  ptid: string;
  ptname: string;
}

export interface AssetGroup {
  assetGroupId: string;
  assetType: string;
  assetName: string;
}

export interface AssetName {
  assetType: string;
  assetId: string;
  assetName: string;
}

export interface InitDataResponse {
  initData: InitData;
  multiBooks: MultiBook[];
  category_1: IncomeCategory[];
  category_0: ExpenseCategory[];
  payType: PayType[];
  inOutText: string[][];
  assetGroups: AssetGroup[];
  assetNames: AssetName[];
}
