import React, { useState } from "react"
import { IconType } from "react-icons"

interface Props {
  iconType: IconType
  tooltipContent: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  customClass?: string
}

const IconPlayerButton = ({
  iconType: Icon,
  tooltipContent,
  onClick,
  customClass = "",
}: Props) => {
  const [isActive, setIsActive] = useState(false)
  const [showDot, setShowDot] = useState(false)

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
