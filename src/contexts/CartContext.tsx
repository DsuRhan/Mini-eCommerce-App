import { createContext,type ReactNode, useState, useMemo, useCallback } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((p: Product) => {
    setCart((prev) => {
      const exists = prev.find((x) => x.id === p.id);
      if (exists)
        return prev.map((x) =>
          x.id === p.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      return [...prev, { ...p, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const total = useMemo(
    () => cart.reduce((sum, x) => sum + x.price * x.quantity, 0),
    [cart]
  );
  const count = useMemo(
    () => cart.reduce((sum, x) => sum + x.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
};
