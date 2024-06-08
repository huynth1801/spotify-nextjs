import React from "react"
import { HomeIcon } from "@heroicons/react/24/outline"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import IconButton from "./IconButton"
import Library from "./Library"
import { signOut, useSession } from "next-auth/react"
import { usePlaylistContext } from "@/context/PlaylistContext"

const Sidebar = () => {
  const {
    playlistContextState: { playlists },
    updatePlaylistContextState,
  } = usePlaylistContext()

  return (
    <div className="text-gray-500 px-6 pt-5 pb-36 text-xs lg:text-sm border-r border-gray-900 h-screen overflow-y-scroll no-scrollbar sm:max-w-[12rem] md:w-96  lg:max-w-[20rem] hidden md:block">
      <div className="space-y-4 bg-zinc-900 py-5 px-4 py-auto rounded-lg">
        <IconButton icon={HomeIcon} label="Home" />
        <IconButton icon={MagnifyingGlassIcon} label="Search" />
      </div>
      <Library
        playlists={playlists}
        updatePlaylistContextState={updatePlaylistContextState}
      />
      <div className="mt-2 bg-zinc-900 px-4 py-5 rounded-lg"></div>
    </div>
  )
}

export default Sidebar
