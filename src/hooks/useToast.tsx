import { useState } from "react";

export const useToast = () => {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string, duration = 3000) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), duration);
  };

  const Toast = () =>
    message ? (
      <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-lg animate-fade">
        {message}
      </div>
    ) : null;

  return { showToast, Toast };
};
