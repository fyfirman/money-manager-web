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

export const getBaseUrl = () =>
  !env.enableMock
    ? `${useConfigStore.getState().baseUrl}/moneyBook`
    : "http://localhost:3000";

export const axios = applyCaseMiddleware(
  Axios.create({
    baseURL: getBaseUrl(),
    headers: {
      "Content-Type": "application/json",
    },
  }),
  caseMiddlewareOption,
);

axios.interceptors.request.use((config) => {
  config.baseURL = getBaseUrl();
  return config;
});
