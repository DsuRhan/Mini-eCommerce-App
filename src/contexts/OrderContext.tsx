import { createContext, useState,type ReactNode, useEffect } from "react";
import type { CartItem } from "./CartContext";

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    const updated = [...orders, order];
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  useEffect(() => {
    const saved = localStorage.getItem("orders");
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
