import create from "zustand";
import { devtools } from "zustand/middleware";

interface Account {
  id: string;
  name: string;
}

interface AccountState {
  accounts: Account[];
  getAccountByName: (name: Account["name"]) => Account | undefined;
}

export const useAccountStore = create<AccountState>()(
  devtools(
    (set, get) => ({
      accounts: [],
      getAccountByName(name) {
        const { accounts } = get();
        const result = accounts.find((account) => account.name === name);

        if (!result) {
          return undefined;
        }

        return result;
      },
    }),
    {
      name: "Account",
    },
  ),
);
