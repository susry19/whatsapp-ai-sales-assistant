"use client";

import { useState, useEffect } from "react";

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/conversations")
      .then(res => res.json())
      .then(data => {
        if (data.conversations) setConversations(data.conversations);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th scope="col" className="px-6 py-3">Customer</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Platform</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Last Message</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center">Loading...</td></tr>
              ) : conversations.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center">No active conversations found.</td></tr>
              ) : (
                conversations.map((c) => (
                  <tr key={c.id} className="bg-white border-b hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 font-medium text-gray-900">{c.customer?.name || "Unknown"}</td>
                    <td className="px-6 py-4">{c.customer?.phone}</td>
                    <td className="px-6 py-4"><span className="bg-whatsapp/10 text-whatsapp px-2 py-1 rounded-full text-xs font-semibold">{c.platform}</span></td>
                    <td className="px-6 py-4">{c.status}</td>
                    <td className="px-6 py-4 truncate max-w-xs">{c.messages?.[0]?.content || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
