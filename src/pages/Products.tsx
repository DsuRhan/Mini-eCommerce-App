import  { useEffect, useState, useCallback } from "react";
import type { Product } from "../type";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../hooks/useCart";

export default function ProductsPage() {
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { add } = useCart();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) throw new Error("Failed to fetch");
      const d = await res.json();
      setData(d);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <section className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={add} />
      ))}
    </section>
  );
}
