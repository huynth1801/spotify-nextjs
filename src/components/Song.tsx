import React from "react"
import Image from "next/image"
import { converDuration } from "@/utils/convertDuration"
import useSpotify from "@/hooks/useSpotify"
import { useSongContext } from "@/context/SongContext"
import { SongReducerActionType } from "@/types"
import { usePlaylistContext } from "@/context/PlaylistContext"

interface Props {
  item: SpotifyApi.PlaylistTrackObject
  itemIndex: number
}

const Song = ({ item: { track, added_at }, itemIndex }: Props) => {
  const spotifyApi = useSpotify()

  const {
    songContextState: { deviceId },
    dispatchSongAction,
  } = useSongContext()

  const {
    playlistContextState: { selectedPlaylist },
  } = usePlaylistContext()

  const playSong = async () => {
    if (!deviceId) return

    dispatchSongAction({
      type: SongReducerActionType.SetCurrentPlayingSong,
      payload: {
        selectedSongId: track?.id,
        selectedSong: track,
        isPlaying: true,
      },
    })

    await spotifyApi.play({
      device_id: deviceId,
      context_uri: selectedPlaylist?.uri,
      offset: {
        uri: track?.uri!,
      },
    })
  }

  return (
    <tr
      className="text-gray-500 hover:bg-gray-900 cursor-pointer"
      onClick={playSong}
    >
      <td className="px-5 py-4">{itemIndex + 1}</td>
      <td className="px-2 py-4 flex items-center space-x-4">
        <Image
          src={track?.album.images[0].url || ""}
          alt="Track cover photo"
          height={50}
          width={50}
          className="rounded-lg"
        />
        <div>
          <p className="truncate text-white">{track?.name}</p>
          <p>{track?.artists[0].name}</p>
        </div>
      </td>
      <td className="px-5 py-4 truncate">{track?.album.name}</td>
      <td className="px-5 py-4">{new Date(added_at).toLocaleDateString()}</td>
      <td className="px-5 py-4 text-right">
        {converDuration(track?.duration_ms as number)}
      </td>
    </tr>
  )
}

export default Song
