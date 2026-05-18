import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen w-full bg-gray-50/50">
      <div className="hidden border-r bg-white lg:block lg:w-64">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <span className="text-whatsapp">WaSales AI</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium gap-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/products"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
              >
                Products
              </Link>
              <Link
                href="/dashboard/conversations"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
              >
                Conversations
              </Link>
              <Link
                href="/dashboard/orders"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
              >
                Orders
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
              >
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex h-[60px] items-center gap-4 border-b bg-white px-6">
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Account</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
