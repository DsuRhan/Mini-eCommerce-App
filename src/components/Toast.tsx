import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type Toast = { id: string; text: string };
type ToastContextType = { push: (text: string, ms?: number) => void };

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((text: string, ms = 3000) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, ms);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`min-w-[200px] max-w-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded p-3 animate-fade`}
            role="status"
            aria-live="polite"
          >
            {t.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
