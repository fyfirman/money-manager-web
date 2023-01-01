import { Select, SelectProps } from "antd";
import { CategoryType, useCategoryStore } from "~/stores/category.store";

interface CategorySelectProps extends SelectProps {}

const CategorySelect: React.FC<CategorySelectProps> = (props) => {
  const expenseCategories = useCategoryStore((state) =>
    state.categories.filter((c) => c.type === CategoryType.Expense),
  );

  return (
    <Select
      allowClear
      filterOption={(input, option) =>
        String(option?.label ?? "")
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      options={expenseCategories.map((c) => ({
        label: c.name,
        value: c.id,
      }))}
      placeholder="Please choose the category"
      showSearch
      {...props}
    />
  );
};

export default CategorySelect;
