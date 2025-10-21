import  { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {type Product as PType } from "../contexts/CartContext";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useToast } from "../components/Toast";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<PType | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const cart = useContext(CartContext)!;
  const push = useToast().push;
  const nav = useNavigate();

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) throw new Error("Not found");
      const data = (await res.json()) as PType;
      setProduct(data);
    } catch (e: unknown) {
      if (e instanceof Error) setErr(e.message);
      else setErr("Unknown error");
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
    <div className="p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <img src={product.image} alt={product.title} className="h-72 object-contain mx-auto" />
      <div>
        <h2 className="text-xl font-bold">{product.title}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                cart.addToCart(product);
                push("Added to cart");
              }}
              className="bg-blue-600 text-white px-3 py-2 rounded"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                cart.addToCart(product);
                push("Added & returning");
                nav(-1);
              }}
              className="bg-green-600 text-white px-3 py-2 rounded"
            >
              Add & Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
