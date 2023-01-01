import { useMutation } from "@tanstack/react-query";
import { Button, Popconfirm, Table, TableProps } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import React, { useState } from "react";
import { errorHandler } from "~/helpers/error-handler";
import globalService from "~/services/global-service.service";
import { Transaction } from "~/stores/transaction.store";
import { queryClient } from "~/utils/query-client";
import { numWords } from "~/libs/num-words/num-words";
import { titleCase } from "~/libs/title-case/title-case";
import { TransactionColumn, transactionColumns } from "./transaction-columns";

const TransactionTable: React.FC<TableProps<TransactionColumn>> = (props) => {
  const [selectedRows, setSelectedRows] = useState<Transaction["id"][]>([]);
  const deleteMutation = useMutation(
    ["deleteTransaction"],
    globalService.postDeleteTransaction,
  );

  const rowSelection: TableRowSelection<TransactionColumn> = {
    onChange: (selectedRowKeys) => {
      setSelectedRows(selectedRowKeys as Transaction["id"][]);
    },
  };

  const handleDeleteClick = async () => {
    try {
      if (selectedRows.length > 10) {
        throw new Error("Deleting more than 10 items is not allowed");
      }

      await deleteMutation.mutateAsync(selectedRows);
      setSelectedRows([]);

      void queryClient.refetchQueries(["getTransactions"]);
    } catch (error: unknown) {
      errorHandler(error);
    }
  };

  return (
    <div>
      <div className="mb-2">
        <Popconfirm
          cancelText="No"
          okText="Yes"
          onConfirm={handleDeleteClick}
          placement="topLeft"
          title={`${titleCase(numWords(selectedRows.length))} (${
            selectedRows.length
          }) transactions are selected. Are you sure to delete these transactions?`}
        >
          <Button disabled={selectedRows.length === 0}>Delete</Button>
        </Popconfirm>
      </div>
      <Table<TransactionColumn>
        columns={transactionColumns}
        rowKey="id"
        rowSelection={rowSelection}
        {...props}
      />
    </div>
  );
};

export default TransactionTable;
