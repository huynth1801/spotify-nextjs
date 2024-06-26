import {
  SongContextState,
  SongReducerAction,
  SongReducerActionType,
} from "@/types"

export const SongReducer = (
  state: SongContextState,
  { type, payload }: SongReducerAction
) => {
  switch (type) {
    case SongReducerActionType.SetDevice:
      return {
        ...state,
        deviceId: payload.deviceId,
        volume: payload.volume,
      }
    case SongReducerActionType.ToggleIsPlaying:
      return {
        ...state,
        isPlaying: payload,
      }
    case SongReducerActionType.SetCurrentPlayingSong:
      const { selectedSong, selectedSongId, isPlaying } = payload
      return {
        ...state,
        selectedSongId,
        selectedSong,
        payload,
      }
    case SongReducerActionType.SetVolume:
      return {
        ...state,
        volume: payload,
      }
    case SongReducerActionType.SetRepeatMode:
      return {
        ...state,
        payload: payload.repeatMode,
      }
    case SongReducerActionType.SetShuffleMode:
      return {
        ...state,
        payload: payload.isShuffling,
      }
    default:
      return state
  }
}
