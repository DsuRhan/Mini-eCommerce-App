import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../components/Toast";


export default function LoginPage() {
  const auth = useContext(AuthContext)!;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const loc = useLocation() as { state?: { from?: string } };
  const from = loc.state?.from || "/home";
  const { push } = useToast();

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    await auth.login(name, password);
    if (auth.user) {
      push("Login successful");
      nav(from);
    } else {
      push("Login failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handle} className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Display name (optional)"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-3 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
