"use client";
import { useFilterContext } from "@/context/FilterContext";

type Category = {
  CategoryID: number;
  CategoryName: string;
};

type Props = {
  categories: Category[];
};

const CategoryFilter = ({ categories }: Props) => {
  const { selectedCategory, setSelectedCategory } = useFilterContext();

  return (
    <div className="mb-6 pb-6 border-b border-zinc-400 dark:border-zinc-500">
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-3 font-mono">
        Categories
      </h3>
      <ul className="space-y-2">
        {categories.map(category => {
          const isSelected = selectedCategory === category.CategoryID;

          return (
            <li
              key={category.CategoryID}
              onClick={() =>
                setSelectedCategory(isSelected ? null : category.CategoryID)
              }
              className={`cursor-pointer px-4 py-2 rounded-lg border transition-all duration-200
                ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 border-zinc-300 dark:border-zinc-600"
                }`}>
              {category.CategoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryFilter;
