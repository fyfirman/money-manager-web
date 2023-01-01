import { Select } from "antd";
import { useTransactionStore } from "~/stores/transaction.store";

interface ContentSelectProps {
  defaultValue: any; // TODO: Replace any with right type
}

const ContentSelect: React.FC<ContentSelectProps> = ({ defaultValue }) => {
  const possibleContents = useTransactionStore((state) => state.getListedContent());

  return (
    <Select
      allowClear
      defaultValue={defaultValue}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={possibleContents.map((c) => ({
        label: c,
        value: c,
      }))}
      placeholder="Please choose the content"
      showSearch
    />
  );
};

export default ContentSelect;
