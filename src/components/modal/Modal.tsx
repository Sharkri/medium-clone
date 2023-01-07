import { useContext } from "react";
import ModalContext from "./ModalContext";
import "../../css/Modal.css";

function Modal() {
  const { isModalOpen, modalContent } = useContext(ModalContext);
  return isModalOpen ? (
    <div className="modal">
      <div className="modal-content">{modalContent}</div>
    </div>
  ) : null;
}

export default Modal;
