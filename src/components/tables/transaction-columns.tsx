import { ColumnType } from "antd/es/table";
import { dateSortComparison, stringSortComparison } from "~/helpers/sort-fn";
import { currencyFormatter } from "~/helpers/string-helper";
import type { EditableCellParams } from "../editable-cell";
import TransactionTableAction from "./transaction-table-action";

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

export interface GetTransactionColumnsParams {
  editingKey: TransactionColumn["id"];
  onSave?: (record: TransactionColumn) => void;
  onEdit?: (record: TransactionColumn) => void;
  onCancel?: (record: TransactionColumn) => void;
}

export type TransactionColumnsType = (
  | ColumnType<TransactionColumn> & {
      editable?: boolean;
    }
)[];

export const getTransactionColumns = ({
  editingKey,
  onSave,
  onEdit,
  onCancel,
}: GetTransactionColumnsParams): TransactionColumnsType => {
  return [
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
      editable: true,
      sorter: (a, b) => stringSortComparison(a.content, b.content),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => b.amount - a.amount,
      render(value) {
        return currencyFormatter(value as number);
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => stringSortComparison(a.content, b.content),
    },
    {
      title: "Action",
      width: 120,
      render(value, record) {
        return (
          <TransactionTableAction
            editingKey={editingKey}
            onCancel={onCancel}
            onEdit={onEdit}
            onSave={onSave}
            record={record}
          />
        );
      },
    },
  ];
};

export const getEditableTransactionColumns = (params: GetTransactionColumnsParams) => {
  const columns = getTransactionColumns(params);

  return columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TransactionColumn): EditableCellParams<TransactionColumn> => ({
        record,
        dataIndex: col.dataIndex as keyof TransactionColumn,
        editing: params.editingKey === record.id,
      }),
    };
  });
};
