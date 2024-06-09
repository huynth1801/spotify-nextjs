import Song from "@/components/Song"
import { ISongContext, SongContextState } from "@/types"
import { ReactNode, useContext } from "react"
import { createContext } from "react"

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
