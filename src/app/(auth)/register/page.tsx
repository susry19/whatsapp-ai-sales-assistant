"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", companyName: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Kayıt işlemi başarısız oldu (Lütfen veritabanı bağlantınızı kontrol edin).");
      }
    } catch (err) {
      setError("Sunucuya bağlanılamadı. Lütfen veritabanı ayarlarını kontrol edin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 relative overflow-hidden px-4 py-12 font-sans">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1000px] pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-whatsapp/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob [animation-delay:2000ms]"></div>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-whatsapp to-emerald-400 flex items-center justify-center shadow-lg shadow-whatsapp/20 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">WaSales<span className="text-whatsapp">.AI</span></span>
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Ücretsiz Denemeye Başla</h2>
            <p className="mt-2 text-sm text-slate-500">
              Zaten hesabın var mı?{" "}
              <Link href="/login" className="font-semibold text-whatsapp hover:text-emerald-500 transition-colors">
                Giriş yap
              </Link>
            </p>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100 flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Şirket Adı</label>
                <input
                  name="companyName"
                  type="text"
                  required
                  className="w-full rounded-xl border-slate-200 bg-slate-50/50 py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-whatsapp focus:border-transparent transition-all outline-none"
                  placeholder="Şirketinizin Adı"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ad Soyad</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border-slate-200 bg-slate-50/50 py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-whatsapp focus:border-transparent transition-all outline-none"
                  placeholder="Adınız Soyadınız"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-posta</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border-slate-200 bg-slate-50/50 py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-whatsapp focus:border-transparent transition-all outline-none"
                  placeholder="ornek@sirketiniz.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Şifre</label>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-xl border-slate-200 bg-slate-50/50 py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-whatsapp focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center rounded-xl bg-whatsapp px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-whatsapp/20 hover:bg-emerald-600 hover:shadow-emerald-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-whatsapp focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? "Hesap Oluşturuluyor..." : "Hesap Oluştur"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
