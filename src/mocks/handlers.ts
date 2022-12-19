import { rest } from "msw";
import { env } from "~/utils/env-variable";
import getInitDataResponse from "./responses/get-init-data.json";
import { getDataByPeriodResponse } from "./responses/get-data-by-period-response";

export const handlers = [
  // Handles a POST
  rest.post(`${env.baseUrl}/login`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`${env.baseUrl}/create`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`${env.baseUrl}/delete`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // Handles a GET
  rest.get(`${env.baseUrl}/getInitData`, (req, res, ctx) => {
    return res(ctx.json(getInitDataResponse));
  }),

  rest.get(`${env.baseUrl}/getDataByPeriod`, (req, res, ctx) => {
    return res(ctx.xml(getDataByPeriodResponse));
  }),
];
