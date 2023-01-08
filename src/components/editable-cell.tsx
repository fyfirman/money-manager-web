import React from "react";
import { Form, Input } from "antd";
import { Rule } from "antd/es/form";

export interface EditableCellParams {
  rules?: Rule[];
  InputNode?: React.FC;
}

export interface EditableCellProps<Item>
  extends React.HTMLAttributes<HTMLElement>,
    EditableCellParams {
  children: React.ReactNode;
  dataIndex: string;
  editing: boolean;
  record: Item;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint --- intentionally extends unknown otherwise the editor read as jsx component
const EditableCell = <Item extends unknown>({
  editing,
  dataIndex,
  record,
  children,
  rules,
  InputNode,
  ...restProps
}: EditableCellProps<Item>) => {
  return (
    <td {...restProps}>
      {editing ? (
        InputNode ? (
          <InputNode />
        ) : (
          <Form.Item className="m-0" name={dataIndex} rules={rules}>
            <Input />
          </Form.Item>
        )
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
