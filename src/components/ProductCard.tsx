"use client";
import Image from "next/image";

type ProductProps = {
  product: {
    ProductName: string;
    Price: number;
    Stock: boolean;
    Image: string;
  };
};

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex flex-col">
      <div className="relative w-full h-48 bg-zinc-100 dark:bg-zinc-700">
        <Image
          src={product.Image}
          alt={product.ProductName}
          fill
          className="object-contain p-4"
        />
      </div>

      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 text-lg">
          {product.ProductName}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          {product.Price.toLocaleString()} تومان
        </p>
        <p
          className={`text-sm font-medium ${
            product.Stock
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}>
          {product.Stock ? "موجود" : "ناموجود"}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
