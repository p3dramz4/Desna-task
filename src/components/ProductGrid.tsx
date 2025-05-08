"use client";

import Image from "next/image";
import { useFilterContext } from "@/context/FilterContext";

type Product = {
  ProductName: string;
  Stock: boolean;
  Price: number;
  Image: string;
  CategoryID: number;
  Filters: { Filter: number; Option: number }[];
};

type Props = {
  products: Product[];
};

const ProductGrid = ({ products }: Props) => {
  const { selectedCategory, selectedFilters } = useFilterContext();

  const filteredProducts = products.filter(product => {
    if (selectedCategory && product.CategoryID !== selectedCategory) {
      return false;
    }

    for (const [filterId, optionIds] of Object.entries(selectedFilters)) {
      const productOptionIds = product.Filters.filter(
        f => f.Filter === Number(filterId)
      ) 
        .map(f => f.Option); 

      if (optionIds.length > 1) {
        const hasMatchingOption = optionIds.some(opt =>
          productOptionIds.includes(opt)
        );
        if (!hasMatchingOption) {

        }
      } else {
        const hasAllOptions = optionIds.every(opt =>
          productOptionIds.includes(opt)
        );
        if (!hasAllOptions) {
          return false;
        }
      }
    }

    return true; 
  });

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {filteredProducts.map((product, index) => (
        <div
          key={index}
          className="bg-zinc-200 dark:bg-zinc-600 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4 shadow hover:shadow-lg transition-all duration-200">
          <Image
            src={product.Image}
            alt={product.ProductName}
            width={300}
            height={300}
            className="w-full h-48 object-contain mb-3 rounded-md"
          />
          <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 text-lg mb-1">
            {product.ProductName}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
            {product.Price.toLocaleString()} $
          </p>

          <button
            disabled={!product.Stock}
            className={`w-full py-2 rounded-lg text-sm font-medium transition-all  ${
              product.Stock
                ? "bg-zinc-900 text-white hover:bg-blue-700 cursor-pointer"
                : "bg-zinc-400 dark:bg-zinc-500 text-zinc-200 cursor-not-allowed"
            }`}>
            {product.Stock ? "Add" : "No Stock"}
          </button>
        </div>
      ))}

      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center text-zinc-600 dark:text-zinc-300 py-12">
          <p>No products found matching the selected filters.</p>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
