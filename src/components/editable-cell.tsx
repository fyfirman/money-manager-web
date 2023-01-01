import React from "react";
import { Form, Input } from "antd";
import { Rule } from "antd/es/form";

export interface EditableCellParams<Item> {
  rules?: Rule[];
  inputNode?: React.ReactNode;
  editing: boolean;
  dataIndex: string;
  record: Item;
}

export interface EditableCellProps<Item>
  extends React.HTMLAttributes<HTMLElement>,
    EditableCellParams<Item> {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint --- intentionally extends unknown otherwise the editor read as jsx component
const EditableCell = <Item extends unknown>({
  editing,
  dataIndex,
  record,
  children,
  rules,
  inputNode,
  ...restProps
}: EditableCellProps<Item>) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} rules={rules} style={{ margin: 0 }}>
          {inputNode ?? <Input />}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
