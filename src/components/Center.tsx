import { usePlaylistContext } from "@/context/PlaylistContext"
import { useSession } from "next-auth/react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import userIcon from "@/app/user_icon.jpg"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { pickRandom } from "@/utils/pickRandom"
import Songs from "./Songs"

const colors = [
  "from-violet-700",
  "from-purple-700",
  "from-red-700",
  "from-teal-700",
  "from-emerald-700",
  "from-green-700",
  "from-zinc-700",
]

const Center = () => {
  const {
    playlistContextState: { selectedPlaylist, selectedPlaylistId },
  } = usePlaylistContext()
  const { data: session } = useSession()

  const [fromColor, setFromColor] = useState<string | null>(null)

  useEffect(() => {
    setFromColor(pickRandom(colors))
  }, [selectedPlaylistId])
  return (
    <div className="text-white flex-grow relative h-screen overflow-y-scroll no-scrollbar">
      <header className="absolute top-5 right-8 ">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full py-1 pl-1 pr-2"
          onClick={() => {}}
        >
          <Image
            src={session?.user?.image! || userIcon}
            alt="User avatar"
            height={40}
            width={40}
            className="rounded-full object-contain"
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon width={20} height={20} />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b from-cyan-700 to-black h-80 ${fromColor} p-8`}
      >
        {selectedPlaylist && (
          <>
            <Image
              src={selectedPlaylist?.images[0].url}
              alt="Playlist Image"
              height={176}
              width={176}
              className="shadow-2xl"
            />
          </>
        )}
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {selectedPlaylist?.name}
          </h1>
        </div>
      </section>

      {/* Song */}
      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center
