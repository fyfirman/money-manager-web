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
    }
)[];

export const getTransactionColumns = ({
  form,
  renderAction,
}: GetTransactionColumnsParams): TransactionColumnsType => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      editable: true,
      renderEditInput(record) {
        return (
          <>
            <Form.Item
              initialValue={dayjs()}
              name="date"
              rules={[{ required: true, message: "Please choose the date" }]}
              style={{ margin: 0 }}
            >
              <DatePicker
                defaultValue={dayjs(record.date)}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion --- disabled due to antd docs example
                getPopupContainer={(trigger) => trigger.parentElement!}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item name="id" noStyle>
              <Input type="hidden" />
            </Form.Item>
          </>
        );
      },
      sorter: (a, b) => dateSortComparison(new Date(a.date), new Date(b.date)),
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
      editable: true,
      renderEditInput: (record) => (
        <Form.Item
          name="account"
          rules={[{ required: true, message: "Please choose the account" }]}
          style={{ margin: 0 }}
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
            name="category"
            rules={[{ required: true, message: "Please choose the category" }]}
            style={{ margin: 0 }}
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
          className="mb-0"
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
                name="subCategory"
                rules={[
                  {
                    required: subCategories.length > 0,
                    message: "Please choose the sub-category",
                  },
                ]}
                style={{ margin: 0 }}
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
          name="content"
          rules={[{ required: true, message: "Please choose the content" }]}
          style={{ margin: 0 }}
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
      renderEditInput(record) {
        return (
          <Form.Item
            name="amount"
            rules={[{ required: true, message: "Please choose the amount" }]}
            style={{ margin: 0 }}
          >
            <AmountInput defaultValue={record.amount} />
          </Form.Item>
        );
      },
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
      render: renderAction,
    },
  ];
};

export const getEditableTransactionColumns = (params: GetTransactionColumnsParams) => {
  const columns = getTransactionColumns(params);

  return columns.map((col) => {
    const { renderEditInput = () => {} } = col;
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TransactionColumn) => ({
        record,
        dataIndex: col.dataIndex as keyof TransactionColumn,
        editing: params.editingKey === record.id,
        InputNode: () => renderEditInput(record),
      }),
    };
  });
};
