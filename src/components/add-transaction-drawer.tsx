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
import globalService, { InOutType } from "~/services/global-service.service";

type AddTransactionDrawerProps = DrawerProps;

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

  const mutation = useMutation(["transaction"], globalService.postCreateTransaction, {
    onError(err) {
      void message.error((err as Error).message);
    },
  });
  const [form] = Form.useForm<AddNewTransactionForm>();

  const handleFinish = (values: AddNewTransactionForm) => {
    void mutation.mutateAsync({
      assetId: 0, // todo
      mbCash: 0, // todo
      mcid: 0, // todo
      mcscid: 0, // todo
      inOutType: InOutType.Expense,
      mbCategory: values.category,
      subCategory: values.subCategory,
      mbContent: values.content,
      mbDate: values.date.toISOString().slice(0, -2),
      payType: values.account,
      mbDetailContent: "",
    });
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
                options={[
                  { label: "test", value: "test 12xxa3" },
                  { label: "test", value: "test s123xx" },
                ]}
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
                options={[
                  { label: "test", value: "test 123" },
                  { label: "xxx", value: "test 1223" },
                ]}
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
              {({ getFieldValue }) => (
                <Form.Item
                  label="Sub-Category"
                  name="subCategory"
                  rules={[{ required: true, message: "Please choose the sub-category" }]}
                >
                  <Select
                    allowClear
                    disabled={!getFieldValue("category")}
                    options={[
                      { label: "test", value: "test 12s3" },
                      { label: "test", value: "test 1x23" },
                    ]}
                    placeholder="Please choose the sub-category"
                  />
                </Form.Item>
              )}
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
              <Input placeholder="Please enter content" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: "Please choose the amount" }]}
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
          <Button onClick={form.submit} type="primary">
            Submit
          </Button>
        </Space>
      </Space>
    </Drawer>
  );
};

export default AddTransactionDrawer;
