import Song from "@/components/Song"
import useSpotify from "@/hooks/useSpotify"
import { ISongContext, SongContextState, SongReducerActionType } from "@/types"
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
  dispatchSongAction: () => {},
})

export const useSongContext = () => useContext(SongContext)

const SongContextProvider = ({ children }: { children: ReactNode }) => {
  const spotifyApi = useSpotify()

  const { data: session } = useSession()

  const [songContextState, dispatchSongAction] = useReducer(
    SongReducer,
    defaultSongContextState
  )

  useEffect(() => {
    const setCurrentDevice = async () => {
      try {
        const availableDeviceResponse = await spotifyApi.getMyDevices()
        if (!availableDeviceResponse.body.devices.length) return

        const { id: deviceId, volume_percent } =
          availableDeviceResponse.body.devices[0]

        dispatchSongAction({
          type: SongReducerActionType.SetDevice,
          payload: {
            deviceId,
            volume: volume_percent as number,
          },
        })

        await spotifyApi.transferMyPlayback([deviceId as string])
      } catch (error) {
        console.error("Error setting current device", error)
      }
    }

    if (spotifyApi.getAccessToken()) {
      setCurrentDevice()
    }
  }, [spotifyApi, session])

  useEffect(() => {
    const getCurrentPlayingSong = async () => {
      const songInfo = await spotifyApi.getMyCurrentPlayingTrack()

      if (!songInfo.body) return

      // console.log("Song info", songInfo.body)

      dispatchSongAction({
        type: SongReducerActionType.SetCurrentPlayingSong,
        payload: {
          selectedSong: songInfo.body.item as SpotifyApi.TrackObjectFull,
          selectedSongId: songInfo.body.item?.id,
          isPlaying: songInfo.body.is_playing,
        },
      })
    }

    if (spotifyApi.getAccessToken()) {
      getCurrentPlayingSong()
    }
  }, [spotifyApi, session])

  const songConTextProviderData = {
    songContextState,
    dispatchSongAction,
  }

  return (
    <SongContext.Provider value={songConTextProviderData}>
      {children}
    </SongContext.Provider>
  )
}

export default SongContextProvider
