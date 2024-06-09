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
    default:
      return state
  }
}
