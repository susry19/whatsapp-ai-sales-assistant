import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getSession();
  
  const [productCount, orderCount, convCount] = await Promise.all([
    prisma.product.count({ where: { organizationId: session.organizationId } }),
    prisma.order.count({ where: { organizationId: session.organizationId } }),
    prisma.conversation.count({ where: { organizationId: session.organizationId } })
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500">Total Products</h3>
          </div>
          <div className="text-3xl font-bold">{productCount}</div>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500">Total Orders</h3>
          </div>
          <div className="text-3xl font-bold">{orderCount}</div>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500">Active Conversations</h3>
          </div>
          <div className="text-3xl font-bold">{convCount}</div>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500">AI Response Rate</h3>
          </div>
          <div className="text-3xl font-bold">100%</div>
        </div>
      </div>
    </div>
  );
}
