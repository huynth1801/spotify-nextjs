import React, { useState, useEffect } from "react"
import { IconType } from "react-icons"

interface Props {
  iconType: IconType
  tooltipContent: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  customClass?: string
  repeatMode?: "off" | "context" | "track"
}

const IconPlayerButton = ({
  iconType: Icon,
  tooltipContent,
  onClick,
  customClass = "",
  repeatMode,
}: Props) => {
  const [isActive, setIsActive] = useState(false)
  const [showDot, setShowDot] = useState(false)

  useEffect(() => {
    if (repeatMode === "context" || repeatMode === "track") {
      setIsActive(true)
      setShowDot(true)
    } else {
      setIsActive(false)
      setShowDot(false)
    }
  }, [repeatMode])

  const renderNumber =
    repeatMode === "track" ? (
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-green-500">
        1
      </span>
    ) : null

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsActive(!isActive) // Toggle active state
    if (onClick) onClick(e) // Call the passed onClick function
    setShowDot(!showDot)
  }

  return (
    <button
      className="group relative flex justify-center cursor-pointer"
      onClick={handleClick}
    >
      <Icon
        className={`hover:scale-110 ${
          isActive ? "text-green-500 " : ""
        } ${customClass}`}
        data-ripple-light="true"
        data-tooltip-target="tooltip"
      />
      {renderNumber}
      {showDot && (
        <div className="absolute w-1 h-1 bg-green-500 rounded-full top-6"></div>
      )}
      <div className="absolute scale-0 whitespace-nowrap group-hover:scale-100 rounded text-sm bg-gray-800 p-2 bottom-10">
        {tooltipContent}
      </div>
    </button>
  )
}

export default IconPlayerButton
