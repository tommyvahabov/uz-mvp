import { useEffect, useMemo, useState } from "react"
// Attempt to use the Medusa Admin SDK route config helper if present
// If the symbol is not found at build time, the component will still be bundled,
// but the page might not appear in the sidebar automatically.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { defineRouteConfig } from "@medusajs/admin-sdk"

type Shop = {
  id: string
  name: string
  handle: string
  description?: string | null
  is_active?: boolean
}

export const config = (defineRouteConfig && defineRouteConfig({
  label: "Shops",
  path: "/platform/shops",
})) || undefined

const ShopsPage = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [shops, setShops] = useState<Shop[]>([])
  const [count, setCount] = useState<number>(0)
  const [form, setForm] = useState({ name: "", handle: "", description: "" })

  const canSubmit = useMemo(() => {
    return form.name.trim().length > 0 && form.handle.trim().length > 0
  }, [form])

  const fetchShops = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/admin/platform/shops?limit=50&offset=0`)
      if (!res.ok) throw new Error(`Failed to fetch shops: ${res.status}`)
      const data = await res.json()
      setShops(data.shops || [])
      setCount(data.count || 0)
    } catch (e: any) {
      setError(e?.message || "Failed loading shops")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShops()
  }, [])

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    try {
      const res = await fetch(`/admin/platform/shops`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          handle: form.handle.trim(),
          description: form.description.trim() || undefined,
          is_active: true,
        }),
      })
      if (!res.ok) throw new Error(`Create failed: ${res.status}`)
      setForm({ name: "", handle: "", description: "" })
      await fetchShops()
    } catch (e: any) {
      setError(e?.message || "Failed creating shop")
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Shops</h1>

      <form onSubmit={onCreate} style={{ display: "grid", gap: 8, maxWidth: 480, marginBottom: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="My Shop"
            style={{ width: "100%", padding: 8, border: "1px solid #e5e7eb", borderRadius: 6 }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Handle</label>
          <input
            value={form.handle}
            onChange={(e) => setForm((f) => ({ ...f, handle: e.target.value }))}
            placeholder="my-shop"
            style={{ width: "100%", padding: 8, border: "1px solid #e5e7eb", borderRadius: 6 }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Description (optional)"
            style={{ width: "100%", padding: 8, border: "1px solid #e5e7eb", borderRadius: 6 }}
            rows={3}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={!canSubmit}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              background: canSubmit ? "#111827" : "#9ca3af",
              color: "white",
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
          >
            Create shop
          </button>
        </div>
      </form>

      {error && (
        <div style={{ color: "#b91c1c", marginBottom: 12 }}>{error}</div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>
            {count} total
          </div>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb", textAlign: "left" }}>
                  <th style={{ padding: 8, fontSize: 12, color: "#6b7280" }}>Name</th>
                  <th style={{ padding: 8, fontSize: 12, color: "#6b7280" }}>Handle</th>
                  <th style={{ padding: 8, fontSize: 12, color: "#6b7280" }}>Active</th>
                </tr>
              </thead>
              <tbody>
                {shops.map((s) => (
                  <tr key={s.id}>
                    <td style={{ padding: 8, borderTop: "1px solid #e5e7eb" }}>{s.name}</td>
                    <td style={{ padding: 8, borderTop: "1px solid #e5e7eb" }}>{s.handle}</td>
                    <td style={{ padding: 8, borderTop: "1px solid #e5e7eb" }}>{s.is_active ? "Yes" : "No"}</td>
                  </tr>
                ))}
                {!shops.length && (
                  <tr>
                    <td colSpan={3} style={{ padding: 12, textAlign: "center", color: "#6b7280" }}>
                      No shops
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShopsPage


