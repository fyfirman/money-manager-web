import { ColumnsType } from "antd/es/table";
import { dateSortComparison, stringSortComparison } from "~/helpers/sort-fn";

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
    sorter: (a, b) => dateSortComparison(new Date(a.date), new Date(b.date)),
  },
  {
    title: "Account",
    dataIndex: "account",
    key: "account",
    sorter: (a, b) => stringSortComparison(a.account, b.account),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    sorter: (a, b) => stringSortComparison(a.category, b.category),
  },
  {
    title: "Sub-Category",
    dataIndex: "subCategory",
    key: "subCategory",
    sorter: (a, b) => stringSortComparison(a.subCategory, b.subCategory),
  },
  {
    title: "Content",
    dataIndex: "content",
    key: "content",
    sorter: (a, b) => stringSortComparison(a.content, b.content),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    sorter: (a, b) => b.amount - a.amount,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    sorter: (a, b) => stringSortComparison(a.content, b.content),
  },
];
