import React, { useState } from "react"
import { BiRepeat } from "react-icons/bi"
import { IoShuffleOutline } from "react-icons/io5"
import { IoMdSkipBackward, IoIosSkipForward } from "react-icons/io"
import { MdPauseCircle } from "react-icons/md"
import { FaCirclePlay } from "react-icons/fa6"
import { LuPlaySquare, LuVolumeX } from "react-icons/lu"
import { PiMicrophoneStageBold } from "react-icons/pi"
import { LuVolume2 } from "react-icons/lu"
import { spotifyApi } from "@/config/spotify"
import useSpotify from "@/hooks/useSpotify"
import { useSongContext } from "@/context/SongContext"
import { SongReducerActionType } from "@/types"
import Image from "next/image"
import { useDebouncedCallback } from "use-debounce"
import IconPlayerButton from "./IconPlayerButton"

const Player = () => {
  // const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [previousVolume, setPreviousVolume] = useState<number>(0)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  const spotifyApi = useSpotify()

  const {
    songContextState: { isPlaying, selectedSong, deviceId, volume },
    dispatchSongAction,
  } = useSongContext()

  const handlePlayPause = async () => {
    const response = await spotifyApi.getMyCurrentPlaybackState()

    if (!response.body) return

    if (response.body.is_playing) {
      await spotifyApi.pause()
      dispatchSongAction({
        type: SongReducerActionType.ToggleIsPlaying,
        payload: false,
      })
    } else {
      await spotifyApi.play()
      dispatchSongAction({
        type: SongReducerActionType.ToggleIsPlaying,
        payload: true,
      })
    }
  }

  const handleSkipSong = async (skipTo: "previous" | "next") => {
    if (!deviceId) return

    if (skipTo === "previous") {
      await spotifyApi.skipToPrevious()
    } else {
      await spotifyApi.skipToNext()
    }

    const songInfo = await spotifyApi.getMyCurrentPlayingTrack()

    if (!songInfo.body) return

    dispatchSongAction({
      type: SongReducerActionType.SetCurrentPlayingSong,
      payload: {
        selectedSongId: songInfo.body.item?.id,
        selectedSong: songInfo.body.item as SpotifyApi.TrackObjectFull,
        isPlaying: songInfo.body.is_playing,
      },
    })
  }

  const debounceAdjustVolume = useDebouncedCallback((volume: number) => {
    spotifyApi.setVolume(volume)
  }, 500)

  const handleRepeatSong = () => {}

  const handleVolumeChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const volume = Number(event.target.value)

    if (!deviceId) return

    debounceAdjustVolume(volume)

    dispatchSongAction({
      type: SongReducerActionType.SetVolume,
      payload: volume,
    })
  }

  const handleMuteVolume = () => {
    if (!deviceId) return

    if (isMuted) {
      // Unmute
      debounceAdjustVolume(previousVolume)
      dispatchSongAction({
        type: SongReducerActionType.SetVolume,
        payload: previousVolume,
      })
      setIsMuted(false)
    } else {
      // Mute
      setPreviousVolume(volume)
      debounceAdjustVolume(0)
      dispatchSongAction({
        type: SongReducerActionType.SetVolume,
        payload: 0,
      })
      setIsMuted(true)
    }
  }

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">
        {selectedSong && (
          <>
            <div className="hidden md:block ">
              <Image
                src={selectedSong.album.images[0].url}
                alt={`Album cover for ${selectedSong.name}`}
                height={40}
                width={40}
              />
            </div>
            <div>
              <h3>{selectedSong.name}</h3>
              <p className="text-sm text-zinc-500">
                {selectedSong.artists[0].name}
              </p>
            </div>
          </>
        )}
      </div>
      {/* Center */}
      <div className="flex justify-evenly items-center">
        <IconPlayerButton
          iconType={IoShuffleOutline}
          tooltipContent="Shuffle"
        />

        {/* Previous button */}
        <IconPlayerButton
          iconType={IoMdSkipBackward}
          tooltipContent="Previous"
          onClick={handleSkipSong.bind(this, "previous")}
        />

        {isPlaying ? (
          <IconPlayerButton
            iconType={MdPauseCircle}
            tooltipContent="Pause"
            onClick={handlePlayPause}
          />
        ) : (
          <IconPlayerButton
            iconType={FaCirclePlay}
            tooltipContent="Play"
            onClick={handlePlayPause}
          />
        )}

        <IconPlayerButton
          iconType={IoIosSkipForward}
          tooltipContent="Next"
          onClick={handleSkipSong.bind(this, "next")}
        />

        {/* Repeat */}
        <IconPlayerButton iconType={BiRepeat} tooltipContent="Repeat" />
      </div>

      {/* Right */}
      <div className="flex justify-end items-center pr-5 space-x-3 md:space-x-4">
        <IconPlayerButton
          iconType={LuPlaySquare}
          tooltipContent="Now playing preview"
        />
        <IconPlayerButton
          iconType={PiMicrophoneStageBold}
          tooltipContent="Lyrics"
        />
        <IconPlayerButton
          iconType={isMuted ? LuVolumeX : LuVolume2}
          tooltipContent={isMuted ? "Unmute" : "Mute"}
          onClick={handleMuteVolume}
        />
        <input
          type="range"
          min={0}
          max={100}
          className="w-20 md:w-auto accent-white hover:accent-green-500"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  )
}

export default Player
