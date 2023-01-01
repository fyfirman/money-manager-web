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
  getSubCategories(id: Category["id"]): Category["children"];
  getSubCategoriesByName(name: Category["name"]): Category["children"];
}

export const useCategoryStore = create<CategoryState>()(
  devtools(
    (set, get) => ({
      categories: [] as Category[],
      getSubCategories(id) {
        const { categories } = get();
        const result = categories.find((subCategory) => subCategory.id === id);

        if (!result) {
          return [];
        }

        return result.children;
      },
      getSubCategoriesByName(name) {
        const { categories } = get();
        const result = categories.find((subCategory) => subCategory.name === name);

        if (!result) {
          return [];
        }

        return result.children;
      },
    }),
    {
      name: "Category",
    },
  ),
);
