import { Select, SelectProps } from "antd";
import { Category, useCategoryStore } from "~/stores/category.store";

interface SubCategorySelectProps extends SelectProps {
  category: Category["name"];
}

const SubCategorySelect: React.FC<SubCategorySelectProps> = (props) => {
  const { category, ...rest } = props;

  const subCategory = (() => {
    if (!category) {
      return [];
    }

    return useCategoryStore
      .getState()
      .getSubCategoriesByName(category)
      .map((c) => ({
        label: c.name,
        value: c.id,
      }));
  })();

  return (
    <Select
      allowClear
      disabled={!category || subCategory.length === 0}
      options={subCategory}
      placeholder={
        !category || subCategory.length > 0
          ? "Please choose the sub-category"
          : "The category you selected is does not have sub-category"
      }
      {...rest}
    />
  );
};

export default SubCategorySelect;
