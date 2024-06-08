export const converDuration = (durationMs: number): string => {
  const minutes = Math.floor(durationMs / 60000)
  const seconds = Math.floor((durationMs % 60000) / 1000)
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString()
  return `${minutes}:${formattedSeconds}`
}
