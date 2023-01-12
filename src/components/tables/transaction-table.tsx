import { useMutation } from "@tanstack/react-query";
import { Button, Form, Popconfirm, Table, TableProps } from "antd";
import { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import React, { useState } from "react";
import { errorHandler } from "~/helpers/error-handler";
import globalService from "~/services/global-service.service";
import { Transaction } from "~/stores/transaction.store";
import { queryClient } from "~/utils/query-client";
import { numWords } from "~/libs/num-words/num-words";
import { titleCase } from "~/libs/title-case/title-case";
import { useCategoryStore } from "~/stores/category.store";
import { useAccountStore } from "~/stores/account.store";
import dayjs from "dayjs";
import { InOutType } from "~/services/global-service.schema";
import EditableCell from "../editable-cell";
import AddTransactionDrawer from "../add-transaction-drawer";
import {
  TransactionColumn,
  getEditableTransactionColumns,
  injectSubHeader,
} from "./transaction-columns";
import TransactionTableAction from "./transaction-table-action";
import TransactionSubheader from "./transaction-subheader-date";

interface EditTransactionForm {
  id: string;
  date: dayjs.Dayjs;
  account: string;
  category: string;
  subCategory: string;
  content: string;
  amount: number;
}

interface TransactionTableProps extends TableProps<TransactionColumn> {
  showSubHeader?: boolean;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  dataSource,
  showSubHeader,
  ...rest
}) => {
  const [selectedRows, setSelectedRows] = useState<Transaction["id"][]>([]);
  const [editingKey, setEditingKey] = useState<Transaction["id"]>("");
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [dateDrawer, setDateDrawer] = useState<Date>();

  const [form] = Form.useForm<EditTransactionForm>();
  const updateMutation = useMutation(
    ["updateTransaction"],
    globalService.postUpdateTransaction,
  );
  const deleteMutation = useMutation(
    ["deleteTransaction"],
    globalService.postDeleteTransaction,
  );

  const rowSelection: TableRowSelection<TransactionColumn> = {
    onChange: (selectedRowKeys) => {
      setSelectedRows(selectedRowKeys as Transaction["id"][]);
    },
  };

  const handleEditClick = (record: TransactionColumn) => {
    const account = useAccountStore.getState().getAccountByName(record.account)?.id;
    const category = useCategoryStore.getState().getCategoryByName(record.category)?.id;
    const subCategory = useCategoryStore
      .getState()
      .getSubCategoryByName(record.subCategory)?.id;

    form.setFieldsValue({
      ...record,
      account,
      category,
      subCategory,
      date: dayjs(record.date),
    });
    setEditingKey(record.id);
  };

  const handleEditCancel = () => {
    form.resetFields();
    setEditingKey("");
  };

  const handleEditSubmit = async (values: EditTransactionForm) => {
    try {
      await updateMutation.mutateAsync({
        id: values.id,
        mbDate: `${values.date.format("YYYY-MM-DD")}T00:00:00`,
        mbCash: values.amount,
        assetId: values.account,
        inOutType: InOutType.Expense,
        inOutCode: "1", // 1 for Expense
        payType: values.account,
        mbCategory: values.category,
        subCategory: values.subCategory,
        mbContent: values.content,
        mcid: values.category,
        mcscid: values.subCategory,
      });

      setEditingKey("");

      void queryClient.refetchQueries(["getTransactions"]);
    } catch (error: unknown) {
      errorHandler(error);
    }
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

  const handleDateClick = (value: string) => {
    setDateDrawer(new Date(value));
    setAddDrawerOpen(true);
  };

  const columns = getEditableTransactionColumns({
    form,
    editingKey,
    renderDate(value, record) {
      if (record.id.search("subheader") !== -1) {
        return <TransactionSubheader date={dayjs(record.date)} />;
      }
      return (
        <a className="text-blue-600" href="#" onClick={() => handleDateClick(value)}>
          {dayjs(value).format("ddd, DD MMM YYYY")}
        </a>
      );
    },
    renderAction(value, record) {
      return (
        <TransactionTableAction
          editingKey={editingKey}
          isLoading={updateMutation.isLoading}
          onCancel={handleEditCancel}
          onEdit={handleEditClick}
          onSave={form.submit}
          record={record}
        />
      );
    },
  }) as ColumnsType<TransactionColumn>;

  return (
    <>
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
        <Form component={false} form={form} onFinish={handleEditSubmit}>
          <Table<TransactionColumn>
            columns={columns}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            dataSource={showSubHeader ? injectSubHeader(dataSource) : dataSource}
            rowKey="id"
            rowSelection={rowSelection}
            {...rest}
          />
        </Form>
      </div>
      <AddTransactionDrawer
        initialDate={dateDrawer}
        onClose={() => setAddDrawerOpen(false)}
        open={addDrawerOpen}
      />
    </>
  );
};

export default TransactionTable;
