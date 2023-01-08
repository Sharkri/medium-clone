import React, { ReactNode } from "react";
import "../css/AuthenticationButton.css";

export default function AuthenticationButton({
  icon,
  text,
  onClick,
}: {
  icon: ReactNode;
  text: string;
  onClick: React.MouseEventHandler;
}) {
  return (
    <button className="authentication-button" onClick={onClick}>
      {icon}
      {text}
    </button>
  );
}
