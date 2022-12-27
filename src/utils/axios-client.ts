import Axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { useConfigStore } from "~/stores/config.store";
import { env } from "./env-variable";

export const axios = applyCaseMiddleware(
  Axios.create({
    baseURL: !env.enableMock ? `${useConfigStore.getState().baseUrl}/moneyBook` : "",
    headers: {
      "Content-Type": "application/json",
    },
  }),
);
