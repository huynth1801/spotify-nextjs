import { usePlaylistContext } from "@/context/PlaylistContext"
import React from "react"
import Song from "./Song"

const Songs = () => {
  const {
    playlistContextState: { selectedPlaylist },
  } = usePlaylistContext()
  if (!selectedPlaylist) return null

  console.log("TRACKS", selectedPlaylist.tracks.items)
  return (
    <div className="flex flex-col space-y-1 px-8 pb-28">
      {selectedPlaylist.tracks.items.map((item, index) => (
        <Song key={item.track?.id} item={item} itemIndex={index} />
      ))}
    </div>
  )
}

export default Songs
