import { ReactNode } from "react";
import Spinner from "./Spinner";

export default function LoadingButton({
  loading,
  type,
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  loading: Boolean;
  type: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: React.MouseEventHandler;
  className: string;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
