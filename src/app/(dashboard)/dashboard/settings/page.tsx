"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    openaiApiKey: "",
    metaAccessToken: "",
    whatsappPhoneId: "",
    instagramToken: "",
    systemPrompt: ""
  });

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.settings) setSettings(data.settings);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      alert("Settings saved successfully!");
    } catch (e) {
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500">Manage your integrations and AI configuration.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 bg-white p-8 rounded-xl border shadow-sm">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">AI Assistant Settings</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Custom OpenAI API Key (Optional)</label>
            <input 
              type="password" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-whatsapp focus:ring-whatsapp sm:text-sm border p-2"
              value={settings.openaiApiKey || ""}
              onChange={e => setSettings({...settings, openaiApiKey: e.target.value})}
              placeholder="sk-..."
            />
            <p className="mt-1 text-xs text-gray-500">Leave blank to use platform default key.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">AI System Prompt</label>
            <textarea 
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-whatsapp focus:ring-whatsapp sm:text-sm border p-2"
              value={settings.systemPrompt || ""}
              onChange={e => setSettings({...settings, systemPrompt: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t">
          <h2 className="text-xl font-semibold">WhatsApp Cloud API</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Meta Access Token</label>
            <input 
              type="password" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-whatsapp focus:ring-whatsapp sm:text-sm border p-2"
              value={settings.metaAccessToken || ""}
              onChange={e => setSettings({...settings, metaAccessToken: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number ID</label>
            <input 
              type="text" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-whatsapp focus:ring-whatsapp sm:text-sm border p-2"
              value={settings.whatsappPhoneId || ""}
              onChange={e => setSettings({...settings, whatsappPhoneId: e.target.value})}
            />
          </div>
        </div>

        <div className="pt-6">
          <button 
            type="submit" 
            disabled={saving}
            className="inline-flex justify-center rounded-md border border-transparent bg-whatsapp py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-whatsapp/90 focus:outline-none focus:ring-2 focus:ring-whatsapp focus:ring-offset-2"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
