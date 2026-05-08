"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0e17] flex items-center justify-center p-6">
      <div className="w-full max-w-md glass p-10 rounded-3xl shadow-2xl animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-[#b8860b]/20 rounded-full">
            <Lock size={40} className="text-[#b8860b]" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-white mb-2">Mermorex Yönetim</h1>
        <p className="text-gray-400 text-center mb-10 text-sm uppercase tracking-widest">Sistem Girişi</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">E-posta</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-[#b8860b] transition-colors"
              placeholder="admin@mermorex.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Şifre</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-[#b8860b] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#b8860b] hover:bg-[#d4af37] text-white py-4 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
