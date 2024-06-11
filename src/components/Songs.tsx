import { usePlaylistContext } from "@/context/PlaylistContext"
import React from "react"
import Song from "./Song"
import { IoTimeOutline } from "react-icons/io5"

const Songs = () => {
  const {
    playlistContextState: { selectedPlaylist },
  } = usePlaylistContext()

  if (!selectedPlaylist) return null

  return (
    <div className="px-8 pb-28">
      <table className="w-full text-left divide-y divide-gray-500 text-sm font-normal mb-2">
        <thead className="text-gray-500">
          <tr>
            <th className="px-5 py-4">#</th>
            <th className="px-2 py-4">Title</th>
            <th className="px-5 py-4">Album</th>
            <th className="px-5 py-4">Date added</th>
            <th className="px-5 py-4 text-right">
              <IoTimeOutline className="inline-block w-5 h-5" />
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedPlaylist.tracks.items.map((item, index) => (
            <Song key={item.track?.id} item={item} itemIndex={index} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Songs
