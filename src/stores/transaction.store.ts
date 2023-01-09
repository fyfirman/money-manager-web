import dayjs from "dayjs";
import create from "zustand";
import { devtools } from "zustand/middleware";

export interface Transaction {
  id: string;
  date: string; // date string in UTC format. Example '2021-01-01T00:00:00.000Z'
  account: string;
  category: string;
  subCategory: string;
  content: string;
  amount: number;
  type: string;
}

export type TransactionListGroupByDate = { [key: string]: Transaction[] };

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  getTransactionsGroupByDate: () => TransactionListGroupByDate;
  getListedCategory: () => Transaction["category"][];
  getListedSubCategory: () => Transaction["subCategory"][];
  getListedContent: () => Transaction["content"][];
  getPossibleContent: (keyword: string) => Transaction["content"][];
}

export const useTransactionStore = create<TransactionState>()(
  devtools(
    (set, get) => ({
      transactions: [],
      addTransaction: (transaction) => {
        set(({ transactions }) => ({ transactions: [...transactions, transaction] }));
      },
      getTransactionsGroupByDate: () => {
        const transactions = get().transactions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        return transactions.reduce<TransactionListGroupByDate>((acc, transaction) => {
          const date = dayjs(transaction.date).format("yyyy-MM-dd");

          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition --- IDK
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(transaction);
          return acc;
        }, {});
      },
      getListedCategory: () => {
        const { transactions } = get();
        return [...new Set(transactions.map((transaction) => transaction.category))];
      },
      getListedSubCategory: () => {
        const { transactions } = get();
        return [...new Set(transactions.map((transaction) => transaction.subCategory))];
      },
      getListedContent: () => {
        const { transactions } = get();
        return [
          ...new Set(transactions.map((transaction) => transaction.content)),
        ].sort();
      },
      getPossibleContent: (keyword) => {
        const { transactions } = get();
        const filteredTransaction = transactions.filter((t) =>
          t.content.includes(keyword),
        );

        return filteredTransaction.map((t) => t.content);
      },
    }),
    {
      name: "Transaction",
    },
  ),
);
