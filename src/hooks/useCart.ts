import { useCallback } from "react";
import { useCartContext } from "../contexts/CartContext";
import type { Product } from "../type";

/**
 * Hook wrapper yang mere-expose fungsi cart dengan stable references.
 */
export function useCart() {
  const { items, addToCart, removeFromCart, clearCart, total, count } = useCartContext();

  const add = useCallback((product: Product, qty = 1) => addToCart(product, qty), [addToCart]);
  const remove = useCallback((id: number) => removeFromCart(id), [removeFromCart]);

  return {
    items,
    add,
    remove,
    clearCart,
    total,
    count,
  };
}
