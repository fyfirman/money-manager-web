import {
  Button,
  Col,
  DatePicker,
  Drawer,
  DrawerProps,
  Form,
  Input,
  message,
  Row,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import globalService from "~/services/global-service.service";
import { useCategoryStore } from "~/stores/category.store";
import { CreateTransactionPayload, InOutType } from "~/services/global-service.schema";
import { ZodError } from "zod";
import { queryClient } from "~/utils/query-client";
import ContentItem from "./transaction-form/content-select";
import AmountInput from "./transaction-form/amount-input";
import AccountSelect from "./transaction-form/account-select";
import CategorySelect from "./transaction-form/category-select";
import SubCategorySelect from "./transaction-form/sub-category-select";

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
              <AccountSelect />
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
              <CategorySelect
                onChange={() => form.setFieldValue("subCategory", undefined)}
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
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.category !== currentValues.category
                    }
                  >
                    <SubCategorySelect category={getFieldValue("category")} />
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
              <ContentItem form={form} />
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
              <AmountInput />
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
