import { message } from "antd";
import { ZodError } from "zod";

export const errorHandler = (err: unknown) => {
  if (err instanceof ZodError) {
    void message.error(`${err.issues[0].path[0]}: ${err.issues[0].message}`);
    return;
  }
  void message.error((err as Error).message);
};
