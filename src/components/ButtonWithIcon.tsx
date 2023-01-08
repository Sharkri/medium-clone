import React, { ReactNode } from "react";
import "../css/ButtonWithIcon.css";

export default function ButtonWithIcon({
  icon,
  text,
  onClick,
}: {
  icon: ReactNode;
  text: string;
  onClick?: React.MouseEventHandler;
}) {
  return (
    <button className="button-with-icon" onClick={onClick}>
      {icon}
      {text}
    </button>
  );
}
