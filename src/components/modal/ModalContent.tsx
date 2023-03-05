import { ReactNode } from "react";
import CloseModalButton from "./CloseModalButton";

export default function ModalContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-auto rounded bg-white shadow-lg relative animate-fade-scale-in ${className}`}
    >
      <CloseModalButton />
      {children}
    </div>
  );
}
