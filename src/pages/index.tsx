import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, message } from "antd";
import { useState } from "react";
import AddTransactionDrawer from "~/components/add-transaction-drawer";
import { TransactionColumn } from "~/components/tables/transaction-columns";
import TransactionTable from "~/components/tables/transaction-table";
import globalService from "~/services/global-service.service";

export default function Home() {
  const { data, isLoading } = useQuery(
    ["getData"],
    () =>
      globalService
        .getDataByPeriod("2020-12-10", "2022-12-13")
        .then((raw): TransactionColumn[] =>
          raw.map((t) => ({
            id: t.id,
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
      onError(err) {
        void message.error((err as Error).message);
      },
    },
  );

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="p-8">
        <div className="flex flex-row justify-between mb-4">
          <h1>Expenses</h1>
          <div>
            <Button icon={<PlusOutlined />} onClick={showDrawer} type="primary">
              Add new transaction
            </Button>
          </div>
        </div>
        <TransactionTable dataSource={data} loading={isLoading} />
      </div>
      <AddTransactionDrawer onClose={onClose} open={open} />
    </>
  );
}
