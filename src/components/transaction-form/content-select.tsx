import { Select, SelectProps } from "antd";
import { useTransactionStore } from "~/stores/transaction.store";

interface ContentSelectProps extends SelectProps {}

const ContentSelect: React.FC<ContentSelectProps> = (props) => {
  const possibleContents = useTransactionStore((state) => state.getListedContent());

  return (
    <Select
      allowClear
      filterOption={(input, option) =>
        String(option?.label ?? "")
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      options={possibleContents.map((c) => ({
        label: c,
        value: c,
      }))}
      placeholder="Please choose the content"
      showSearch
      {...props}
    />
  );
};

export default ContentSelect;
