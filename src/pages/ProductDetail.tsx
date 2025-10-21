import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../type";
import { useCart } from "../hooks/useCart";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const { add } = useCart();
  const navigate = useNavigate();

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) throw new Error("Product not found");
      const d = await res.json();
      setProduct(d);
    } catch (err: unknown) {
  if (err instanceof Error) setErr(err.message);
  else setErr("ERROR");
} finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (err) return <div className="p-6 text-red-600">Error: {err}</div>;
  if (!product) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <img src={product.image} alt={product.title} className="object-contain h-64 mx-auto" />
      <div>
        <h2 className="text-xl font-bold">{product.title}</h2>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          <div className="space-x-2">
            <button
              onClick={() => {
                add(product, 1);
                // exit product detail popup behaviour (here: navigate back)
                navigate(-1);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add to Cart & Back
            </button>
            <button
              onClick={() => add(product, 1)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
