import create from "zustand";
import { devtools } from "zustand/middleware";

interface Account {
  id: string;
  name: string;
}

interface AccountState {
  accounts: Account[];
}

const initState: AccountState = {
  accounts: [],
};

export const useAccountStore = create<AccountState>()(
  devtools(() => initState, {
    name: "Account",
  }),
);
