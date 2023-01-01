import { Select, SelectProps } from "antd";
import React from "react";
import { useAccountStore } from "~/stores/account.store";

interface AccountSelectProps extends SelectProps {}

const AccountSelect: React.FC<AccountSelectProps> = (props) => {
  const accounts = useAccountStore((state) => state.accounts);

  return (
    <Select
      allowClear
      options={accounts.map((a) => ({
        label: a.name,
        value: a.id,
      }))}
      placeholder="Please choose the account"
      {...props}
    />
  );
};

export default AccountSelect;
