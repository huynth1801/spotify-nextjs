import { Session } from "inspector"
import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

export enum TokenError {
  RefreshAccessTokenError = "RefreshAccessTokenError",
}

export interface ExtendedToken extends JWT {
  accessToken: string
  refreshToken: string
  accessTokenExpireAt: number
  user: User
  error?: TokenError
}

export interface ExtendedSession extends Session {
  accessToken: ExtendedToken["accessToken"]
  error: ExtendedToken["error"]
}

export interface PlaylistContextState {
  playlists: SpotifyApi.PlaylistObjectSimplified[]
  selectedPlaylistId: null | string
  selectedPlaylist: SpotifyApi.SinglePlaylistResponse | null
}

export interface IPlaylistContext {
  playlistContextState: PlaylistContextState
  updatePlaylistContextState: (
    updatedObj: Partial<PlaylistContextState>
  ) => void
}

export interface SongContextState {
  selectedSongId?: string
  selectedSong: any | null
  isPlaying: boolean
  volume: number
  deviceId: string | null
}

export interface ISongContext {
  songContextState: SongContextState
}
