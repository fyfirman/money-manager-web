import { Typography } from "antd";
import Loading from "../loading";
import type { TransactionColumn } from "./transaction-columns";

export interface TransactionTableActionProps {
  record: TransactionColumn;
  editingKey: TransactionColumn["id"];
  onSave?: (record: TransactionColumn) => void;
  onEdit?: (record: TransactionColumn) => void;
  onCancel?: (record: TransactionColumn) => void;
  isLoading?: boolean;
}

const TransactionTableAction: React.FC<TransactionTableActionProps> = ({
  record,
  editingKey,
  onSave = () => {},
  onEdit = () => {},
  onCancel = () => {},
  isLoading = false,
}) => {
  if (record.id === editingKey && isLoading) {
    return <Loading size="small" />;
  }

  if (record.id === editingKey) {
    return (
      <span>
        <Typography.Link onClick={() => onSave(record)} style={{ marginRight: 8 }}>
          Save
        </Typography.Link>
        <Typography.Link onClick={() => onCancel(record)}>Cancel</Typography.Link>
      </span>
    );
  }

  return (
    <Typography.Link disabled={editingKey !== ""} onClick={() => onEdit(record)}>
      Edit
    </Typography.Link>
  );
};

export default TransactionTableAction;
