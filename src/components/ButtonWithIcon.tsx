import React, { ReactNode } from "react";
import "../css/ButtonWithIcon.css";

export default function ButtonWithIcon({
  icon,
  children,
  onClick,
}: {
  icon: string;
  children: ReactNode;
  onClick?: React.MouseEventHandler;
}) {
  return (
    <button className="button-with-icon" onClick={onClick}>
      <i className={icon} />
      {children}
    </button>
  );
}
