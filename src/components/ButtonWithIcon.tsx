import React, { ReactNode } from "react";

export default function ButtonWithIcon({
  icon, // FontAwesome icon className
  children,
  onClick,
}: {
  icon: string;
  children: ReactNode;
  onClick?: React.MouseEventHandler;
}) {
  return (
    <button
      className="pt-[9px] pr-3 pb-[10px] pl-5 border-[1px] border-solid border-neutral-400 rounded-full"
      onClick={onClick}
    >
      <span className="flex items-center gap-3 text-[14.2px] text-lighterblack leading-5 text-left">
        <i className={`${icon} text-lg`} />
        {children}
      </span>
    </button>
  );
}
