import { rest } from "msw";
import { getDataByPeriodResponse } from "./responses/get-data-by-period-response";
import { getInitDataResponse } from "./responses/get-init-data";

export const handlers = [
  // Handles a POST
  rest.post(`/login`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`/create`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`/delete`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // Handles a GET
  rest.get(`/getInitData`, (req, res, ctx) => {
    return res(ctx.text(getInitDataResponse));
  }),

  rest.get(`/getDataByPeriod`, (req, res, ctx) => {
    return res(ctx.xml(getDataByPeriodResponse));
  }),
];
