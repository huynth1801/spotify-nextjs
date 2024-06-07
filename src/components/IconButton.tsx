import React from "react";

interface Props {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
}

const IconButton = ({ icon: Icon, label }: Props) => {
  return (
    <button className="flex items-center space-x-3 hover:text-white font-bold hover:cursor-pointer">
      <Icon className="icon" />
      <span>{label}</span>
    </button>
  );
};

export default IconButton;
