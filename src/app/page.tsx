import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-whatsapp selection:text-white">
      {/* Header */}
      <header className="px-6 lg:px-14 h-20 flex items-center border-b border-slate-200/50 bg-white/70 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
        <Link className="flex items-center justify-center gap-2 group" href="#">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-whatsapp to-emerald-400 flex items-center justify-center shadow-lg shadow-whatsapp/20 group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">WaSales<span className="text-whatsapp">.AI</span></span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-8 text-sm font-medium items-center text-slate-600">
          <Link className="hover:text-whatsapp transition-colors" href="#ozellikler">
            Özellikler
          </Link>
          <Link className="hover:text-whatsapp transition-colors" href="#nasil-calisir">
            Nasıl Çalışır?
          </Link>
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <Link className="font-semibold text-slate-900 hover:text-whatsapp transition-colors" href="/login">
            Giriş Yap
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-full bg-slate-900 px-6 text-sm font-medium text-white shadow-md shadow-slate-900/10 transition-all hover:bg-whatsapp hover:shadow-whatsapp/20 hover:-translate-y-0.5"
            href="/register"
          >
            Hemen Başla
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] pointer-events-none">
            <div className="absolute -top-40 left-10 w-72 h-72 bg-whatsapp/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute -top-40 right-10 w-72 h-72 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob [animation-delay:2000ms]"></div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-teal-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob [animation-delay:4000ms]"></div>
          </div>

          <div className="container relative px-4 md:px-6 mx-auto z-10">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center rounded-full border border-whatsapp/20 bg-whatsapp/5 px-3 py-1 text-sm font-medium text-whatsapp mb-8">
                <span className="flex w-2 h-2 rounded-full bg-whatsapp mr-2 animate-pulse"></span>
                WhatsApp ve Instagram için Yeni Nesil Yapay Zeka
              </div>
              
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-[5rem] text-slate-900 max-w-4xl leading-[1.1]">
                Satışlarınızı <span className="text-transparent bg-clip-text bg-gradient-to-r from-whatsapp to-emerald-500">Otomatiğe</span> Bağlayın
              </h1>
              
              <p className="mt-8 max-w-[700px] text-lg sm:text-xl text-slate-600 leading-relaxed font-light">
                Müşterilerinizle 7/24 kesintisiz iletişim kurun. Ürünlerinizi saniyeler içinde sisteme yükleyin, yapay zeka asistanınız siparişleri sizin yerinize alsın.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  className="inline-flex h-14 items-center justify-center rounded-full bg-whatsapp px-10 text-base font-semibold text-white shadow-xl shadow-whatsapp/25 transition-all hover:bg-emerald-600 hover:scale-105"
                  href="/register"
                >
                  Ücretsiz Denemeye Başla
                </Link>
                <Link
                  className="inline-flex h-14 items-center justify-center rounded-full border-2 border-slate-200 bg-white/50 backdrop-blur-sm px-10 text-base font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
                  href="#demo"
                >
                  <svg className="w-5 h-5 mr-2 text-slate-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                  Demo İzle
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="ozellikler" className="w-full py-24 md:py-32 bg-white relative">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-slate-900 mb-4">İşinizi Büyütecek Özellikler</h2>
              <p className="max-w-[700px] text-lg text-slate-500">
                Modern e-ticaret işletmelerinin ihtiyaç duyduğu tüm araçlar tek bir platformda.
              </p>
            </div>
            
            <div className="grid max-w-6xl mx-auto gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="group relative flex flex-col items-start p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1">
                <div className="p-4 bg-whatsapp/10 text-whatsapp rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-whatsapp group-hover:text-white transition-all duration-300">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Tek Tıkla Katalog Entegrasyonu</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Excel veya CSV dosyanızı yükleyin, yapay zeka saniyeler içinde tüm ürün gamınızı öğrensin ve müşterilere anında doğru bilgi vermeye başlasın.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group relative flex flex-col items-start p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1">
                <div className="p-4 bg-blue-500/10 text-blue-600 rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Akıllı Müşteri Asistanı</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Müşterinin niyetini anlayan, şikayetleri yöneten ve kişiye özel ürün önerileri sunan, tıpkı gerçek bir satış temsilcisi gibi çalışan yapay zeka.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group relative flex flex-col items-start p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1">
                <div className="p-4 bg-purple-500/10 text-purple-600 rounded-2xl mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Otomatik Sipariş Yönetimi</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Sohbet üzerinden müşterinin adını, adresini ve sipariş detaylarını alarak panelinizde otomatik olarak sipariş kaydı oluşturur.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="w-full py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-whatsapp/10"></div>
          <div className="container px-4 md:px-6 relative z-10 mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Müşteri hizmetlerinizi devretmeye hazır mısınız?</h2>
            <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg">
              Siz uyurken bile satış yapmaya devam eden yapay zeka asistanınızla hemen tanışın. Kurulum sadece 5 dakika sürer.
            </p>
            <Link
              className="inline-flex h-14 items-center justify-center rounded-full bg-whatsapp px-10 text-base font-bold text-white shadow-lg transition-transform hover:scale-105"
              href="/register"
            >
              Hemen Başlayın
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-whatsapp flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <span className="font-bold text-lg text-slate-900">WaSales.AI</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 WaSales AI. Tüm hakları saklıdır.</p>
          <nav className="flex gap-6">
            <Link className="text-sm text-slate-500 hover:text-whatsapp transition-colors" href="#">Kullanım Şartları</Link>
            <Link className="text-sm text-slate-500 hover:text-whatsapp transition-colors" href="#">Gizlilik Politikası</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
