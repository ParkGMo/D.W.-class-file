import React from "react";
import { CategoriesName } from "./../../../store/categories/categories";
import CategoryTab from "./category-tab/CategoryTab";
import styles from "./FiltersCategory.module.scss";

function FiltersCategory() {
  return (
    <div className={styles.filter_category}>
      <CategoryTab text={"모두"} CategoriesName={CategoriesName.All} />
      <CategoryTab
        text={"전자기기"}
        CategoriesName={CategoriesName.Electronics}
      />
      <CategoryTab text={"쥬얼리"} CategoriesName={CategoriesName.Jewelry} />
      <CategoryTab
        text={"남성의류"}
        CategoriesName={CategoriesName.MensClothing}
      />
      <CategoryTab
        text={"여성의류"}
        CategoriesName={CategoriesName.WomenClothing}
      />
    </div>
  );
}

export default FiltersCategory;
