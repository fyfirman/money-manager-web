import { useQuery } from "@tanstack/react-query";
import globalService from "~/services/global-service.service";
import { useAccountStore } from "~/stores/account.store";
import { useCategoryStore, Category, CategoryType } from "~/stores/category.store";

export const useInitQuery = () =>
  useQuery(["getInitData"], globalService.getInitData, {
    onSuccess(data) {
      useAccountStore.setState({
        accounts: data.payType.map((p) => ({
          id: p.ptid,
          name: p.ptname,
        })),
      });

      const categories: Category[] = [];
      data.category_0.forEach((c) => {
        categories.push({
          id: c.mcid,
          name: c.mcname,
          type: CategoryType.Income,
          children: c.mcsc.map((subCategory) => ({
            id: subCategory.mcscid,
            name: subCategory.mcscname,
          })),
        });
      });
      data.category_1.forEach((c) => {
        categories.push({
          id: c.mcid,
          name: c.mcname,
          type: CategoryType.Expense,
          children: c.mcsc.map((subCategory) => ({
            id: subCategory.mcscid,
            name: subCategory.mcscname,
          })),
        });
      });

      useCategoryStore.setState({
        categories,
      });
    },
  });
