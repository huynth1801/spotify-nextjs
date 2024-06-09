import Song from "@/components/Song"
import useSpotify from "@/hooks/useSpotify"
import { ISongContext, SongContextState } from "@/types"
import { useSession } from "next-auth/react"
import { ReactNode, useContext, useEffect, useReducer } from "react"
import { createContext } from "react"
import { SongReducer } from "@/reducers/SongReducer"

const defaultSongContextState: SongContextState = {
  selectedSongId: undefined,
  selectedSong: null,
  isPlaying: false,
  volume: 50,
  deviceId: null,
}

export const SongContext = createContext<ISongContext>({
  songContextState: defaultSongContextState,
})

export const usePlaylistContext = () => useContext(SongContext)

const SongContextProvider = ({ children }: { children: ReactNode }) => {
  const spotifyApi = useSpotify()

  const { data: session } = useSession()

  const [songContextState, dispatchSongAction] = useReducer(
    SongReducer,
    defaultSongContextState
  )

  useEffect(() => {
    const setCurrentDevice = async () => {
      const availableDeviceResponse = await spotifyApi.getMyDevices()

      if(!availableDeviceResponse.body.devices)
    }
    if (spotifyApi.getAccessToken()) {
      setCurrentDevice()
    }
  }, [spotifyApi, session])
  const songConTextProviderData = {
    songContextState: defaultSongContextState,
  }

  return (
    <SongContext.Provider value={songConTextProviderData}>
      {children}
    </SongContext.Provider>
  )
}

export default SongContextProvider
