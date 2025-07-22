import React from "react";
import { useExpenseStore } from "../store";

interface CategoryProps {
  month: string;
}

const CategoryContainer: React.FC<CategoryProps> = ({ month }) => {
  const { categories, expenses, selectedYear } = useExpenseStore();
  const totalsByCategory = expenses[selectedYear][month].totalsByCategory;
  console.log("CATEGORIES", categories);
  console.log("EXPENSES", expenses[selectedYear][month].expenses);
  console.log("totalsByCategory", totalsByCategory);

  return (
    <div>
      <ul className="flex flex-col items-start">
        {categories.map((category) => (
          <li className="mb-2 text-lg" key={category.id}>
            {category.name}: {totalsByCategory[category.name] || 0}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryContainer;
