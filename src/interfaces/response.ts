import { AxiosResponse } from "axios";

export interface Response<D> {
  statusCode: number;
  data: D;
  message: string;
}

export type AppErrorResponse<T = unknown> = AxiosResponse<Response<T>>;
