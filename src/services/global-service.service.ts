import { InitDataResponse } from "~/interfaces/init-data";
import { TransactionRaw } from "~/interfaces/transaction-raw";
import { axios } from "~/utils/axios-client";
import { parseXML } from "~/utils/xml-parser";

const getInitData = async () => {
  const { data } = await axios.get<InitDataResponse>("/getInitData");

  return data;
};

const getDataByPeriod = async (
  startDate: string,
  endDate: string,
): Promise<TransactionRaw[]> => {
  const { data: rawXML } = await axios.get<string>(
    `/getDataByPeriod?${new URLSearchParams({ startDate, endDate })}`,
  );

  const doc = parseXML(rawXML);
  const result: TransactionRaw[] = [];
  Array.from(doc.getElementsByTagName("row")).forEach((node) => {
    const obj = {};
    Array.from(node.children).forEach((childNode) => {
      const values = childNode.innerHTML.match(/<!\[CDATA\[(.*?)\]/);
      if (!values) {
        return Object.assign(obj, {
          [childNode.tagName]: !Number.isNaN(Number(childNode.innerHTML))
            ? Number(childNode.innerHTML)
            : childNode.innerHTML,
        });
      }
      return Object.assign(obj, {
        [childNode.tagName]: values[1],
      });
    });
    result.push(obj as TransactionRaw);
  });
  return result;
};

export enum InOutType {
  Expense = "Expense",
  Income = "Income",
}

export interface CreateTransactionPayload {
  mbDate: string;
  mbCash: number;
  inOutType: InOutType;
  payType: string;
  mbCategory: string;
  subCategory: string;
  mbContent: string;
  mbDetailContent?: string;
  assetId: number | string;
  mcid: number | string;
  mcscid: number | string;
}

const postCreateTransaction = async (payload: CreateTransactionPayload) => {
  const { data } = axios.post<any>("/create", payload, {
    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
  });

  return data;
};

const globalService = {
  getInitData,
  getDataByPeriod,
  postCreateTransaction,
};

export default globalService;
