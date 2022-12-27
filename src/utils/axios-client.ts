import Axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { useConfigStore } from "~/stores/config.store";
import { env } from "./env-variable";

const caseMiddlewareOption = {
  caseMiddleware: {
    requestTransformer: (config: any) => {
      // disable request transformer
      return config;
    },
  },
};

export const axios = applyCaseMiddleware(
  Axios.create({
    baseURL: !env.enableMock ? `${useConfigStore.getState().baseUrl}/moneyBook` : "",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  caseMiddlewareOption,
);

axios.interceptors.request.use((config) => {
  config.baseURL = `${useConfigStore.getState().baseUrl}/moneyBook`;
  return config;
});
