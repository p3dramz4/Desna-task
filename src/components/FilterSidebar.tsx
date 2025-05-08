"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import FilterGroup from "./FilterGroup";

type Filter = {
  FilterID: number;
  FilterName: string;
  Options: { OptionID: number; OptionName: string }[];
};

type Props = {
  filters: Filter[];
  categories: {
    CategoryID: number;
    CategoryName: string;
  }[];
};

const FilterSidebar = ({ filters, categories }: Props) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setTheme(isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.theme = newTheme;
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="relative w-full xl:w-2/3">
      <button
        onClick={toggleTheme}
        className="absolute -top-4 -right-4 bg-zinc-200 dark:bg-zinc-700 p-2 rounded-full shadow hover:scale-105 transition cursor-pointer"
        aria-label="Toggle theme">
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-zinc-800" />
        )}
      </button>

      {/* Sidebar */}
      <aside className="p-6 bg-zinc-200 dark:bg-zinc-600 border border-zinc-200 dark:border-zinc-500 rounded-2xl shadow-md dark:shadow-zinc-900/30 transition-colors duration-300 min-w-[170px]">
        <CategoryFilter categories={categories} />
        <div className="space-y-6 mt-6">
          {filters.map(filter => (
            <FilterGroup
              key={filter.FilterID}
              filterId={filter.FilterID}
              filterName={filter.FilterName}
              options={filter.Options}
            />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default FilterSidebar;
