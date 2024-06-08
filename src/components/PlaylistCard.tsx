import React from "react"
import { MusicalNoteIcon } from "@heroicons/react/24/outline"
import { PlaylistContextState } from "@/types"
import useSpotify from "@/hooks/useSpotify"

interface PlaylistCardProps {
  id: string
  playlistName: string
  updatePlaylistContextState: (
    updatedObj: Partial<PlaylistContextState>
  ) => void
}

const PlaylistCard = ({
  id,
  playlistName,
  updatePlaylistContextState,
}: PlaylistCardProps) => {
  const spotifyApi = useSpotify()

  const setSelectedPlaylist = async (playlistId: string) => {
    const playlistResponse = await spotifyApi.getPlaylist(playlistId)
    updatePlaylistContextState({
      selectedPlaylistId: playlistId,
      selectedPlaylist: playlistResponse.body,
    })
  }
  return (
    <div
      className="flex items-center bg-gray-800 p-3 rounded-lg hover:bg-gray-700 w-full space-x-2 cursor-pointer"
      onClick={() => setSelectedPlaylist(id)}
    >
      <div className="bg-gray-700 p-2 rounded-lg mr-4">
        <MusicalNoteIcon className="h-6 w-6 text-gray-300" />
      </div>
      <div>
        <h3 className="text-white font-semibold">{playlistName}</h3>
      </div>
    </div>
  )
}

export default PlaylistCard
