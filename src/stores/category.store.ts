import create from "zustand";
import { devtools } from "zustand/middleware";

export enum CategoryType {
  Expense = "expense",
  Income = "income",
}

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  children: Omit<Category, "children" | "type">[];
}

export interface CategoryState {
  categories: Category[];
}

const initState: CategoryState = {
  categories: [],
};

export const useCategoryStore = create<CategoryState>()(
  devtools(() => initState, {
    name: "Category",
  }),
);
