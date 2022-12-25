import { Table, TableProps } from "antd";
import React from "react";
import { TransactionColumn, transactionColumns } from "./transaction-columns";

const TransactionTable: React.FC<TableProps<TransactionColumn>> = (props) => {
  return <Table<TransactionColumn> columns={transactionColumns} rowKey="id" {...props} />;
};

export default TransactionTable;
