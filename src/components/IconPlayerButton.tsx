import React from "react"
import { IconType } from "react-icons"

interface Props {
  iconType: IconType
  tooltipContent: string
  onClick?: React.MouseEventHandler<SVGElement>
  customClass?: string
}

const IconPlayerButton = ({
  iconType: Icon,
  tooltipContent,
  onClick,
  customClass = "",
}: Props) => {
  return (
    <div className="group relative flex justify-center cursor-pointer">
      <Icon
        className={`hover:scale-110 ${customClass}`}
        data-ripple-light="true"
        data-tooltip-target="tooltip"
        onClick={onClick}
      />
      <div className="absolute scale-0 whitespace-nowrap group-hover:scale-100 rounded text-sm bg-gray-800 p-2 bottom-10">
        {tooltipContent}
      </div>
    </div>
  )
}

export default IconPlayerButton
