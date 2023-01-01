import { Typography } from "antd";
import type { TransactionColumn } from "./transaction-columns";

export interface TransactionTableActionProps {
  record: TransactionColumn;
  editingKey: TransactionColumn["id"];
  onSave?: (record: TransactionColumn) => void;
  onEdit?: (record: TransactionColumn) => void;
  onCancel?: (record: TransactionColumn) => void;
}

const TransactionTableAction: React.FC<TransactionTableActionProps> = ({
  record,
  editingKey,
  onSave = () => {},
  onEdit = () => {},
  onCancel = () => {},
}) => {
  return record.id === editingKey ? (
    <span>
      <Typography.Link onClick={() => onSave(record)} style={{ marginRight: 8 }}>
        Save
      </Typography.Link>
      <Typography.Link onClick={() => onCancel(record)}>Cancel</Typography.Link>
    </span>
  ) : (
    <Typography.Link disabled={editingKey !== ""} onClick={() => onEdit(record)}>
      Edit
    </Typography.Link>
  );
};

export default TransactionTableAction;
