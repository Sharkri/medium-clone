import { ReactNode } from "react";
import Spinner from "./Spinner";

export default function LoadingButton({
  loading,
  type,
  children,
  onClick,
  className = "",
}: {
  loading: Boolean;
  type: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: React.MouseEventHandler;
  className: string;
}) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {loading ? <Spinner /> : children}
    </button>
  );
}
