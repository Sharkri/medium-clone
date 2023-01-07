import { useContext } from "react";
import ModalContext from "./ModalContext";
import "../../css/Modal.css";

function Modal() {
  const { isModalOpen, modalContent, setModalOpen } = useContext(ModalContext);
  return isModalOpen ? (
    <div className="modal">
      <div className="modal-content">
        <button
          className="close-modal"
          onClick={() => setModalOpen(false)}
          aria-label="close"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        {modalContent}
      </div>
    </div>
  ) : null;
}

export default Modal;
