"use client"

import Center from "@/components/Center"
import Sidebar from "@/components/Sidebar"
import Image from "next/image"

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex ">
        {/* Sidebar */}
        <Sidebar />
        {/* Center */}
        <Center />
      </main>
    </div>
  )
}
