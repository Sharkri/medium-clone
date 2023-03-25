import { ReactNode } from "react";

export default function GoBackButton({
  onGoBack,
  children,
}: {
  onGoBack: Function;
  children: ReactNode;
}) {
  return (
    <button
      className="text-green text-[15px]"
      type="button"
      onClick={() => onGoBack()}
    >
      <i className="fa-solid fa-chevron-left thin-icon mr-1" />
      {children}
    </button>
  );
}
