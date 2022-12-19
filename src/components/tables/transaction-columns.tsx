import { ColumnsType } from "antd/es/table";

export interface TransactionColumn {
  id: string;
  date: string;
  account: string;
  category: string;
  subCategory: string;
  content: string;
  amount: number;
  type: string;
}

export const transactionColumns: ColumnsType<TransactionColumn> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Account",
    dataIndex: "account",
    key: "account",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Sub-Category",
    dataIndex: "subCategory",
    key: "subCategory",
  },
  {
    title: "Content",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
];
