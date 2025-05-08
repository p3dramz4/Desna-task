import data from "@/data/data.json";
import FilterSidebar from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";

export default function Page() {
  const products = data.Data.Products;
  const filters = data.Data.Filters;
  const categories = data.Data.Categories;

  return (
    <main className="flex flex-col sm:flex-row gap-6 p-6 w-full h-screen bg-zinc-200 dark:bg-zinc-800">
      <div className="sm:w-1/4 min-w-[200px] bg-zinc-100 dark:bg-zinc-700 rounded-lg p-4 shadow-md">
        <FilterSidebar filters={filters} categories={categories} />
      </div>
      <div className="sm:w-3/4 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-4 shadow-md">
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
