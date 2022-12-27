import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import AddTransactionDrawer from "~/components/add-transaction-drawer";
import TransactionTable from "~/components/tables/transaction-table";
import { useInitQuery } from "~/hooks/use-init-query";
import { useTransactionQuery } from "~/hooks/use-transaction-query";

export default function Home() {
  useInitQuery();
  const { data, isLoading } = useTransactionQuery();

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
        <div>
          <p>Total data: {data?.length ?? 0}</p>
        </div>
        <TransactionTable dataSource={data} loading={isLoading} />
      </div>
      <AddTransactionDrawer onClose={onClose} open={open} />
    </>
  );
}
