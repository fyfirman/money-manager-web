export type GetElementType<T extends any[]> = T extends (infer U)[] ? U : never;
