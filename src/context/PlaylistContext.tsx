import { spotifyApi } from "@/config/spotify"
import useSpotify from "@/hooks/useSpotify"
import { IPlaylistContext, PlaylistContextState } from "@/types"
import { useSession } from "next-auth/react"
import { ReactNode, useContext, useEffect, useState } from "react"
import { createContext } from "react"

const defaultPlaylistContextState: PlaylistContextState = {
  playlists: [],
  selectedPlaylistId: null,
  selectedPlaylist: "",
}

export const PlayListContext = createContext<IPlaylistContext>({
  playlistContextState: defaultPlaylistContextState,
  updatePlaylistContextState: () => {},
})

export const usePlaylistContext = () => useContext(PlayListContext)

const PlaylistContextProvider = ({ children }: { children: ReactNode }) => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [playlistContextState, setPlaylistContextState] = useState(
    defaultPlaylistContextState
  )

  const updatePlaylistContextState = (
    updatedObj: Partial<PlaylistContextState>
  ) => {
    setPlaylistContextState((previousPlaylistContextState) => ({
      ...previousPlaylistContextState,
      ...updatedObj,
    }))
  }

  useEffect(() => {
    const getUserPlaylists = async () => {
      const userPlaylistResponse = await spotifyApi.getUserPlaylists()
      updatePlaylistContextState({ playlists: userPlaylistResponse.body.items })
    }

    if (spotifyApi.getAccessToken()) {
      getUserPlaylists()
    }
  }, [session, spotifyApi])

  const playlistContextProviderData = {
    playlistContextState,
    updatePlaylistContextState,
  }
  return (
    <PlayListContext.Provider value={playlistContextProviderData}>
      {children}
    </PlayListContext.Provider>
  )
}

export default PlaylistContextProvider
