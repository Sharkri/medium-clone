import { useContext } from "react";
import { ModalContext } from "./ModalContext";

function Modal() {
  const { isModalOpen, modalContent } = useContext(ModalContext);
  return isModalOpen ? <div className="modal">{modalContent}</div> : null;
}

export default Modal;
