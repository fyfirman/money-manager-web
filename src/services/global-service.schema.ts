import { z } from "zod";

export enum InOutType {
  Expense = "Expense",
  Income = "Income",
}

export const createTransactionPayloadSchema = z.object({
  mbDate: z.string(),
  mbCash: z.number(),
  inOutType: z.enum(["Income", "Expense"]),
  payType: z.string(),
  mbCategory: z.string(),
  subCategory: z.string().optional(),
  mbContent: z.string(),
  mbDetailContent: z.string().optional(),
  assetId: z.union([z.number(), z.string()]),
  mcid: z.union([z.number(), z.string()]),
  mcscid: z.union([z.number(), z.string()]),
});

export type CreateTransactionPayload = z.infer<typeof createTransactionPayloadSchema>;
