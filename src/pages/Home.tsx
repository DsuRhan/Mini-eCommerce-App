import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {type Product } from "../contexts/CartContext";

export default function Home() {
  const [promo, setPromo] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=3")
      .then((r) => r.json())
      .then(setPromo);
  }, []);

  return (
    <section className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        Welcome to LuneShop
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Find the best deals and categories curated for you.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {promo.map((p) => (
          <div key={p.id} className="border rounded-lg shadow p-3 bg-white dark:bg-gray-800">
            <img src={p.image} className="w-24 h-24 mx-auto" />
            <h3 className="text-sm font-semibold mt-2">{p.title}</h3>
          </div>
        ))}
      </div>

      <Link
        to="/products"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Shop Now
      </Link>
    </section>
  );
}
