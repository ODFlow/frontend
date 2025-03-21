"use client"
import dynamic from "next/dynamic"

// Dynamically import the map component with no SSR to avoid Leaflet issues
const FinlandMap = dynamic(() => import("../../components/finland-map"), {
  ssr: false,
})

export default function MapPage() {
  return (
    <div className="h-screen">
      <FinlandMap />
    </div>
  )
}

