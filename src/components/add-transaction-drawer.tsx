import {
  Button,
  Col,
  DatePicker,
  Drawer,
  DrawerProps,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import globalService from "~/services/global-service.service";
import { CategoryType, useCategoryStore } from "~/stores/category.store";
import { useAccountStore } from "~/stores/account.store";
import { useTransactionStore } from "~/stores/transaction.store";
import { CreateTransactionPayload, InOutType } from "~/services/global-service.schema";
import { ZodError } from "zod";
import { queryClient } from "~/utils/query-client";
import ContentItem from "./transaction-form/content-select";

interface AddTransactionDrawerProps extends DrawerProps {
  onClose: () => void;
}

export interface AddNewTransactionForm {
  date: dayjs.Dayjs;
  account: string;
  category: string;
  subCategory: string;
  content: string;
  amount: number;
  description?: string;
}

const AddTransactionDrawer: React.FC<AddTransactionDrawerProps> = (props) => {
  const { onClose, ...rest } = props;

  const accounts = useAccountStore((state) => state.accounts);
  const expenseCategories = useCategoryStore((state) =>
    state.categories.filter((c) => c.type === CategoryType.Expense),
  );
  const possibleContents = useTransactionStore((state) => state.getListedContent());

  const mutation = useMutation(["transaction"], globalService.postCreateTransaction);

  const [form] = Form.useForm<AddNewTransactionForm>();

  const handleFinish = async (values: AddNewTransactionForm) => {
    try {
      const body: CreateTransactionPayload = {
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
        mbDetailContent: values.description,
      };
      await mutation.mutateAsync(body);

      void queryClient.resetQueries(["getTransactions"]);
      void message.success("Transaction has been added successfully");

      onClose();
      form.resetFields();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return message.error(`${err.issues[0].path[0]}: ${err.issues[0].message}`);
      }
      void message.error((err as Error).message);
    }
  };

  return (
    <Drawer
      bodyStyle={{ paddingBottom: 80 }}
      onClose={onClose}
      title="Add new transaction"
      width={480}
      {...rest}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item
              initialValue={dayjs()}
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please choose the date" }]}
            >
              <DatePicker
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion --- disabled due to antd docs example
                getPopupContainer={(trigger) => trigger.parentElement!}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item
              label="Account"
              name="account"
              rules={[{ required: true, message: "Please choose the account" }]}
            >
              <Select
                allowClear
                options={accounts.map((a) => ({
                  label: a.name,
                  value: a.id,
                }))}
                placeholder="Please choose the account"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please choose the category" }]}
            >
              <Select
                allowClear
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                onChange={() => form.setFieldValue("subCategory", undefined)}
                options={expenseCategories.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
                placeholder="Please choose the category"
                showSearch
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              className="mb-0"
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.category !== currentValues.category
              }
            >
              {({ getFieldValue }) => {
                const subCategory = (() => {
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
                    label="Sub-Category"
                    name="subCategory"
                    rules={[
                      {
                        required: subCategory.length > 0,
                        message: "Please choose the sub-category",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      disabled={!getFieldValue("category") || subCategory.length === 0}
                      options={subCategory}
                      placeholder={
                        !getFieldValue("category") || subCategory.length > 0
                          ? "Please choose the sub-category"
                          : "The category you selected is does not have sub-category"
                      }
                    />
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: "Please choose the content" }]}
            >
              <ContentItem />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: "Please enter amount" }]}
            >
              <InputNumber
                className="w-full"
                min={0}
                placeholder="Please enter amount"
                prefix="Rp."
                step={1000}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item label="Description" name="description">
              <Input.TextArea placeholder="Please enter description" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Space className="flex justify-between">
        <Button onClick={() => form.resetFields()}>Reset</Button>
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button loading={mutation.isLoading} onClick={form.submit} type="primary">
            Submit
          </Button>
        </Space>
      </Space>
    </Drawer>
  );
};

export default AddTransactionDrawer;
