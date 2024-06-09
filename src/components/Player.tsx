import React, { useState } from "react"
import { BiRepeat } from "react-icons/bi"
import { IoShuffleOutline } from "react-icons/io5"
import { IoMdSkipBackward, IoIosSkipForward } from "react-icons/io"
import { MdPauseCircle } from "react-icons/md"
import { FaCirclePlay } from "react-icons/fa6"
import { LuPlaySquare } from "react-icons/lu"
import { PiMicrophoneStageBold } from "react-icons/pi"
import { LuVolume2 } from "react-icons/lu"

const Player = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">SELECTED SONG</div>
      {/* Center */}
      <div className="flex justify-evenly items-center">
        <IoShuffleOutline className="icon-playback" />
        <IoMdSkipBackward className="icon-playback" />
        {isPlaying ? (
          <MdPauseCircle className="icon-playback" />
        ) : (
          <FaCirclePlay className="icon-playback" />
        )}

        <IoIosSkipForward className="icon-playback" />
        <BiRepeat className="icon-playback" />
      </div>

      {/* Right */}
      <div className="flex justify-end items-center pr-5 space-x-3 md:space-x-4">
        <LuPlaySquare className="icon-playback" />
        <PiMicrophoneStageBold className="icon-playback" />
        <LuVolume2 className="icon-playback" />
        <input type="range" min={0} max={100} className="w-20 md:w-auto" />
      </div>
    </div>
  )
}

export default Player
