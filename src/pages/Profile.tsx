import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useToast } from "../components/Toast";

export default function ProfilePage() {
  const auth = useContext(AuthContext)!;
  const [name, setName] = useState(auth.user?.name || "");
  const { push } = useToast();

  const handleSave = () => {
    // simulasikan update nama & avatar (avatar tidak diubah kecuali fetch baru)
    if (!auth.user) return;
    const updated = { ...auth.user, name: name.trim() || auth.user.name };
    localStorage.setItem("user", JSON.stringify(updated));
    // force reload auth by simple dispatch: easiest way is to reload page or better to add setter in context.
    // For simplicity, reload window (not ideal but works).
    push("Profile saved (reload to reflect)");
    setTimeout(() => window.location.reload(), 600);
  };

  if (!auth.user) return <div className="p-6">No user</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex items-center gap-4 mb-4">
        <img src={auth.user.avatar} alt={auth.user.name} className="w-20 h-20 rounded-full" />
        <div>
          <div className="font-semibold">{auth.user.name}</div>
          <div className="text-sm text-gray-600">This is a simulated profile.</div>
        </div>
      </div>

      <div className="space-y-3">
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
        <div className="flex gap-3">
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
