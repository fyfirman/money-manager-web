import create from "zustand";
import { devtools } from "zustand/middleware";

interface ConfigState {
  baseUrl: string;
}

const initState: ConfigState = {
  baseUrl: "",
};

export const useConfigStore = create<ConfigState>()(
  devtools(() => initState, {
    name: "Config",
  }),
);
