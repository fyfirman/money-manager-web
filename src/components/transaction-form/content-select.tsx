import { FormInstance, Select, SelectProps } from "antd";
import { FocusEventHandler } from "react";
import { useTransactionStore } from "~/stores/transaction.store";

interface ContentSelectProps extends SelectProps {
  form: FormInstance<any>;
}

const ContentSelect: React.FC<ContentSelectProps> = ({ form, ...rest }) => {
  const possibleContents = useTransactionStore((state) => state.getListedContent());

  const handleBlur: FocusEventHandler<HTMLElement> = (event) => {
    // @ts-expect-error --- the value is exist
    const { value } = event.target;

    if (!value) {
      return;
    }

    form.setFieldValue("content", value);
  };

  return (
    <Select
      allowClear
      filterOption={(input, option) =>
        String(option?.label ?? "")
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      onBlur={handleBlur}
      options={possibleContents.map((c) => ({
        label: c,
        value: c,
      }))}
      placeholder="Please choose the content"
      showSearch
      {...rest}
    />
  );
};

export default ContentSelect;
