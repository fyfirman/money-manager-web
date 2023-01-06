import create from "zustand";
import { devtools } from "zustand/middleware";
import { GetElementType } from "~/interfaces/helper";

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

export type SubCategory = GetElementType<Category["children"]>;

export interface CategoryState {
  categories: Category[];
  getSubCategories(id: Category["id"]): SubCategory[];
  getSubCategoriesByName(name: Category["name"]): SubCategory[];
  getCategoryByName(name: Category["name"]): Category | undefined;
  getSubCategoryByName(name: SubCategory["name"]): SubCategory | undefined;
}

export const useCategoryStore = create<CategoryState>()(
  devtools(
    (set, get) => ({
      categories: [] as Category[],
      getSubCategories(id) {
        const { categories } = get();
        const result = categories.find((category) => category.id === id);

        if (!result) {
          return [];
        }

        return result.children;
      },
      getSubCategoriesByName(name) {
        const { categories } = get();
        const result = categories.find((category) => category.name === name);

        if (!result) {
          return [];
        }

        return result.children;
      },
      getCategoryByName(name) {
        const { categories } = get();
        const result = categories.find((category) => category.name === name);

        if (!result) {
          return undefined;
        }

        return result;
      },
      getSubCategoryByName(name) {
        const { categories } = get();

        let result: SubCategory | undefined;

        categories.forEach((category) => {
          if (category.children.length === 0) {
            return;
          }

          const temp = category.children.find((subCategory) => subCategory.name === name);

          if (!temp) {
            return;
          }

          result = temp;
        });

        return result;
      },
    }),
    {
      name: "Category",
    },
  ),
);
