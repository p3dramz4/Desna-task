"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FiltersState = {
  [filterId: number]: number[]; 
};

type FilterContextType = {
  selectedFilters: FiltersState;
  toggleOption: (filterId: number, optionId: number) => void;
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFilters, setSelectedFiltersState] = useState<FiltersState>({});
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleOption = (filterId: number, optionId: number) => {
    setSelectedFiltersState(prev => {
      const current = prev[filterId] || [];
      const exists = current.includes(optionId);
      const updated = exists
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      return {
        ...prev,
        [filterId]: updated,
      };
    });
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory) {
      params.set("category", selectedCategory.toString());
    }

    Object.entries(selectedFilters).forEach(([filterId, options]) => {
      options.forEach(optionId => {
        params.append("filters", `${filterId}-${optionId}`);
      });
    });

    router.replace(`?${params.toString()}`);
  }, [selectedCategory, selectedFilters]);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const filtersParam = searchParams.getAll("filters"); 

    if (categoryParam) {
      setSelectedCategory(Number(categoryParam));
    }

    const newFilters: Record<number, number[]> = {};
    filtersParam.forEach(entry => {
      const [fId, oId] = entry.split("-").map(Number);
      if (!newFilters[fId]) newFilters[fId] = [];
      newFilters[fId].push(oId);
    });

    setSelectedFiltersState(newFilters);
  }, []);

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        selectedFilters,
        toggleOption,
        setSelectedCategory,
      }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("Something is wrong");
  }
  return context;
};
