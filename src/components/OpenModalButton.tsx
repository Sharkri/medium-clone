import { ReactNode, useContext } from "react";
import ModalContext from "./modal/ModalContext";

function OpenModalButton({
  element,
  children,
  className = "",
}: {
  element: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const { setModalOpen } = useContext(ModalContext);

  return (
    <button className={className} onClick={() => setModalOpen(true, element)}>
      {children}
    </button>
  );
}

export default OpenModalButton;
