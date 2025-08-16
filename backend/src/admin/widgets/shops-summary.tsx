import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect, useState } from "react"

type Shop = {
  id: string
  name: string
  handle: string
}

const ShopsSummary = () => {
  const [count, setCount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/admin/platform/shops?limit=1`)
        if (!res.ok) {
          throw new Error(`Failed to fetch shops: ${res.status}`)
        }
        const data = await res.json()
        setCount(data.count ?? (Array.isArray(data.shops) ? data.shops.length : 0))
      } catch (e: any) {
        setError(e?.message || "Failed loading shops")
      }
    })()
  }, [])

  return (
    <div style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 8 }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Shops</div>
      {error ? (
        <div style={{ color: "#b91c1c" }}>{error}</div>
      ) : count === null ? (
        <div>Loading...</div>
      ) : (
        <div>Total shops: {count}</div>
      )}
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "home.after",
})

export default ShopsSummary


