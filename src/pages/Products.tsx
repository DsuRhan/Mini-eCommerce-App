import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import { type Product as PType } from "../contexts/CartContext";
import { useToast } from "../components/Toast";
import { CartContext } from "../contexts/CartContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState<PType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const { push } = useToast();
  const cartCtx = useContext(CartContext)!;
  const { theme } = useContext(ThemeContext)!;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = (await res.json()) as PType[];
      setProducts(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      if (!res.ok) return;
      const data = (await res.json()) as string[];
      setCategories(data);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const filtered = useMemo(() => {
    const qlower = q.trim().toLowerCase();
    return products
      .filter((p) => (category === "all" ? true : p.category === category))
      .filter((p) => (qlower ? p.title.toLowerCase().includes(qlower) : true));
  }, [products, q, category]);

  if (loading)
    return (
      <div
        className={`p-6 text-center ${
          theme === "light" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Loading...
      </div>
    );
  if (error)
    return (
      <div
        className={`p-6 text-center ${
          theme === "light" ? "text-red-400" : "text-red-600"
        }`}
      >
        Error: {error}
      </div>
    );

  return (
    <section
      className={`p-6 min-h-screen transition-colors duration-300 ${
        theme === "light" ? "bg-zinc-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className={`flex-1 border px-3 py-2 rounded transition-colors ${
              theme === "light"
                ? "bg-zinc-800 border-zinc-700 text-gray-100 placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
            }`}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`border px-3 py-2 rounded transition-colors ${
              theme === "light"
                ? "bg-zinc-800 border-zinc-700 text-gray-100"
                : "bg-white border-gray-300 text-gray-800"
            }`}
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setQ("");
              setCategory("all");
            }}
            className={`px-3 py-2 rounded transition-colors ${
              theme === "light"
                ? "bg-zinc-700 hover:bg-zinc-600 text-gray-100"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <article
              key={p.id}
              className={`rounded shadow-sm p-4 border transition-colors ${
                theme === "light"
                  ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-750"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Link to={`/products/${p.id}`} className="block h-40">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-contain"
                />
              </Link>
              <h3 className="mt-2 font-semibold text-sm line-clamp-2">
                {p.title}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold">${p.price.toFixed(2)}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      cartCtx.addToCart(p);
                      push("Added to cart");
                    }}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      theme === "light"
                        ? "bg-blue-600 hover:bg-blue-500 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    Add
                  </button>
                  <Link
                    to={`/products/${p.id}`}
                    className={`px-3 py-1 border rounded text-sm transition-colors ${
                      theme === "light"
                        ? "border-zinc-600 hover:bg-zinc-700"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    Detail
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
