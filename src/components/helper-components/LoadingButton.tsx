import { ReactNode } from "react";
import Spinner from "./Spinner";

export default function LoadingButton({
  loading,
  type,
  children,
  onClick,
}: {
  loading: Boolean;
  type: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: React.MouseEventHandler;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex justify-center items-center w-full min-h-[42px] leading-5 text-[15px] pt-[7px] px-4 pb-[9px] bg-lightblack border-lightblack text-white rounded-full transition duration-[0.25s] hover:bg-black hover:border-lightblack"
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
