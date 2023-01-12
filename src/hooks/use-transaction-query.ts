import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import dayjs from "dayjs";
import { TransactionColumn } from "~/components/tables/transaction-columns";
import globalService from "~/services/global-service.service";
import { useTransactionStore } from "~/stores/transaction.store";

const previousDate = dayjs().subtract(5, "year");

export const useTransactionQuery = () =>
  useQuery(
    ["getTransactions"],
    () =>
      globalService
        .getDataByPeriod(previousDate.format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD"))
        .then((raw): TransactionColumn[] =>
          raw.map((t) => ({
            id: String(t.id),
            date: t.mbDate,
            account: t.payType,
            category: t.mbCategory,
            subCategory: t.subCategory,
            content: t.mbContent,
            amount: t.mbCash,
            type: t.inOutType,
          })),
        ),
    {
      onSuccess(data) {
        useTransactionStore.setState({
          transactions: data,
        });
      },
      onError(err) {
        void message.error((err as Error).message);
      },
    },
  );
