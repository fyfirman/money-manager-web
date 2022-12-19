import Axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import { env } from "./env-variable";

export const axios = applyCaseMiddleware(
  Axios.create({
    baseURL: env.baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  }),
);
