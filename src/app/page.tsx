"use client"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import Center from "@/components/Center"
import Sidebar from "@/components/Sidebar"
import PlaylistContextProvider from "@/context/PlaylistContext"

interface Props {
  session: Session | null
}

export default function Home({ session }: Props) {
  return (
    <SessionProvider>
      <PlaylistContextProvider>
        <div className="bg-black h-screen overflow-hidden">
          <main className="flex ">
            {/* Sidebar */}
            <Sidebar />
            {/* Center */}
            <Center />
          </main>
        </div>
      </PlaylistContextProvider>
    </SessionProvider>
  )
}
