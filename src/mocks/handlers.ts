import { rest } from "msw";
import { env } from "~/utils/env-variable";
import postUploadResponse from "./responses/post_upload.json";

export const handlers = [
  // Handles a POST
  rest.post(`${env.baseUrl}/login`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`${env.baseUrl}/upload`, (req, res, ctx) => {
    return res(ctx.json(postUploadResponse));
  }),

  // Handles a GET
  rest.get(`${env.baseUrl}/users`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: 1,
            name: "test",
          },
        ],
      }),
    );
  }),
];
