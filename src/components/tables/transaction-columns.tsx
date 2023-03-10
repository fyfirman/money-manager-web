import { DatePicker, Form, FormInstance, Input } from "antd";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { dateSortComparison, stringSortComparison } from "~/helpers/sort-fn";
import { currencyFormatter } from "~/helpers/string-helper";
import { useCategoryStore } from "~/stores/category.store";
import AccountSelect from "../transaction-form/account-select";
import AmountInput from "../transaction-form/amount-input";
import CategorySelect from "../transaction-form/category-select";
import ContentSelect from "../transaction-form/content-select";
import SubCategorySelect from "../transaction-form/sub-category-select";

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
  form: FormInstance;
  editingKey: TransactionColumn["id"];
  renderDate: (
    value: TransactionColumn["date"],
    record: TransactionColumn,
    index: number,
  ) => React.ReactNode;
  renderAction: (
    value: undefined,
    record: TransactionColumn,
    index: number,
  ) => React.ReactNode;
}

export type TransactionColumnsType = (
  | ColumnType<TransactionColumn> & {
      editable?: boolean;
      renderEditInput?: (record: TransactionColumn) => React.ReactNode;
      subHeaderColSpan?: number;
    }
)[];

export const getTransactionColumns = ({
  form,
  renderAction,
  renderDate,
}: GetTransactionColumnsParams): TransactionColumnsType => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      editable: true,
      subHeaderColSpan: 5,
      renderEditInput(record) {
        return (
          <>
            <Form.Item
              className="m-0"
              initialValue={dayjs()}
              name="date"
              rules={[{ required: true, message: "Please choose the date" }]}
            >
              <DatePicker
                className="w-full"
                defaultValue={dayjs(record.date)}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion --- disabled due to antd docs example
                getPopupContainer={(trigger) => trigger.parentElement!}
              />
            </Form.Item>
            <Form.Item name="id" noStyle>
              <Input type="hidden" />
            </Form.Item>
          </>
        );
      },
      sorter: (a, b) => dateSortComparison(new Date(a.date), new Date(b.date)),
      render: renderDate,
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
      editable: true,
      renderEditInput: (record) => (
        <Form.Item
          className="m-0"
          name="account"
          rules={[{ required: true, message: "Please choose the account" }]}
        >
          <AccountSelect defaultValue={record.account} />
        </Form.Item>
      ),
      sorter: (a, b) => stringSortComparison(a.account, b.account),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => stringSortComparison(a.category, b.category),
      editable: true,
      renderEditInput: () => {
        return (
          <Form.Item
            className="m-0"
            name="category"
            rules={[{ required: true, message: "Please choose the category" }]}
          >
            <CategorySelect
              onChange={() => form.setFieldValue("subCategory", undefined)}
            />
          </Form.Item>
        );
      },
    },
    {
      title: "Sub-Category",
      dataIndex: "subCategory",
      key: "subCategory",
      editable: true,
      renderEditInput: () => (
        <Form.Item
          className="m-0"
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.category !== currentValues.category
          }
        >
          {({ getFieldValue }) => {
            const subCategories = (() => {
              if (!getFieldValue("category")) {
                return [];
              }

              return useCategoryStore
                .getState()
                .getSubCategories(getFieldValue("category") as string)
                .map((c) => ({
                  label: c.name,
                  value: c.id,
                }));
            })();

            return (
              <Form.Item
                className="m-0"
                name="subCategory"
                rules={[
                  {
                    required: subCategories.length > 0,
                    message: "Please choose the sub-category",
                  },
                ]}
              >
                <SubCategorySelect category={getFieldValue("category")} />
              </Form.Item>
            );
          }}
        </Form.Item>
      ),
      sorter: (a, b) => stringSortComparison(a.subCategory, b.subCategory),
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      editable: true,
      renderEditInput: (record) => (
        <Form.Item
          className="m-0"
          name="content"
          rules={[{ required: true, message: "Please choose the content" }]}
        >
          <ContentSelect defaultValue={record.content} form={form} />
        </Form.Item>
      ),
      sorter: (a, b) => stringSortComparison(a.content, b.content),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => b.amount - a.amount,
      editable: true,
      subHeaderColSpan: 3,
      renderEditInput(record) {
        return (
          <Form.Item
            className="m-0"
            name="amount"
            rules={[{ required: true, message: "Please choose the amount" }]}
          >
            <AmountInput defaultValue={record.amount} />
          </Form.Item>
        );
      },
      render(value, record) {
        if (record.id.search("subheader") !== -1) {
          return (
            <span className="text-red-600">{currencyFormatter(value as number)}</span>
          );
        }
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
      render: renderAction,
    },
  ];
};

export const getEditableTransactionColumns = (params: GetTransactionColumnsParams) => {
  const columns = getTransactionColumns(params);

  return columns.map((col) => {
    const { renderEditInput = () => {} } = col;

    const getColSpan = (id: TransactionColumn["id"]) => {
      const isSubHeader = id.search("subheader") !== -1;
      if (col.subHeaderColSpan && isSubHeader) {
        return col.subHeaderColSpan;
      }

      if (isSubHeader) {
        return 0;
      }

      return 1;
    };

    if (!col.editable) {
      return {
        ...col,
        onCell: (record: TransactionColumn) => ({
          colSpan: getColSpan(record.id),
        }),
      };
    }
    return {
      ...col,
      onCell: (record: TransactionColumn) => ({
        colSpan: getColSpan(record.id),
        record,
        dataIndex: col.dataIndex as keyof TransactionColumn,
        editing: params.editingKey === record.id,
        InputNode: () => renderEditInput(record),
      }),
    };
  });
};

export const injectSubHeader = (dataSource?: readonly TransactionColumn[]) => {
  if (!dataSource) {
    return [];
  }

  const result: TransactionColumn[] = [];
  const idToTotalAmount: Record<string, { index: number; amount: number }> = {};
  dataSource.forEach((t) => {
    const id = `subheader-${t.date}`;
    if (result.length === 0 || result[result.length - 1].date !== t.date) {
      Object.assign(idToTotalAmount, { [id]: { index: result.length, amount: 0 } });
      result.push({
        id,
        date: t.date,
        account: "",
        category: "",
        subCategory: "",
        content: "",
        amount: 0,
        type: "",
      });
    }
    idToTotalAmount[id].amount += t.amount;
    result.push(t);
  });
  Object.keys(idToTotalAmount).forEach((id) => {
    result[idToTotalAmount[id].index].amount = idToTotalAmount[id].amount;
  });
  return result;
};
