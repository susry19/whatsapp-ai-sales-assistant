"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (res.ok) setProducts(data.products);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const res = await fetch("/api/products/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ products: results.data }),
          });
          if (res.ok) {
            alert("Products uploaded and AI trained successfully!");
            fetchProducts();
          } else {
            alert("Upload failed.");
          }
        } catch (err) {
          console.error(err);
        } finally {
          setUploading(false);
        }
      },
      error: (error) => {
        console.error(error);
        setUploading(false);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <div className="flex gap-4">
          <label className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-whatsapp px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-whatsapp/90">
            {uploading ? "Uploading..." : "Upload CSV"}
            <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th scope="col" className="px-6 py-3">Product Name</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Stock</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-4 text-center">Loading...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-4 text-center">No products found. Upload a CSV to get started.</td></tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{p.urun_adi}</td>
                    <td className="px-6 py-4">{p.kategori || "-"}</td>
                    <td className="px-6 py-4">{p.fiyat ? `$${p.fiyat}` : "-"}</td>
                    <td className="px-6 py-4">{p.stok || "-"}</td>
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
