import { InitDataResponse } from "~/interfaces/init-data";
import { TransactionRaw } from "~/interfaces/transaction-raw";
import { axios } from "~/utils/axios-client";
import { parseXML } from "~/utils/xml-parser";
import {
  CreateTransactionPayload,
  createTransactionPayloadSchema,
} from "./global-service.schema";

const getInitData = async () => {
  const res = await axios.get<string>("/getInitData");
  // eslint-disable-next-line no-eval --- TODO: Security issue about eval()
  const data: InitDataResponse = eval(`(${res.data})`);

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

const postCreateTransaction = async (payload: CreateTransactionPayload) => {
  createTransactionPayloadSchema.parse(payload);

  void axios.post<unknown>("/create", payload, {
    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
  });
};

const globalService = {
  getInitData,
  getDataByPeriod,
  postCreateTransaction,
};

export default globalService;
