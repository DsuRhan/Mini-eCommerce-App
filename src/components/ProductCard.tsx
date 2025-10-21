import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../type";

export const ProductCard: React.FC<{
  product: Product;
  onAdd?: (p: Product) => void;
}> = ({ product, onAdd }) => {
  return (
    <div className="border rounded p-4 flex flex-col">
      <Link to={`/products/${product.id}`} className="flex-1">
        <img src={product.image} alt={product.title} className="h-40 mx-auto object-contain" />
        <h3 className="mt-2 font-semibold text-sm">{product.title}</h3>
      </Link>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold"> ${product.price.toFixed(2)} </span>
        <button
          onClick={() => onAdd?.(product)}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
