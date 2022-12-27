import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ConfigState {
  baseUrl: string;
}

const initState: ConfigState = {
  baseUrl: "http://192.168.1.1:8888",
};

const persistConfig = {
  name: "config-storage",
};

export const useConfigStore = create<ConfigState>()(
  devtools(
    persist(() => initState, persistConfig),
    {
      name: "Config",
    },
  ),
);
