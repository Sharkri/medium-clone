import { ReactNode, useContext } from "react";
import { ModalContext } from "./ModalContext";

function Modal({ children }: { children: ReactNode }) {
  const { isModalOpen } = useContext(ModalContext);
  if (isModalOpen) return <div className="modal">{children}</div>;
  return null;
}

export default Modal;
