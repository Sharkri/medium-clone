import { useContext } from "react";
import ModalContext from "./ModalContext";
import "../../css/Modal.css";

function Modal() {
  const { isModalOpen, modalContent, setModalOpen } = useContext(ModalContext);
  return isModalOpen ? (
    <div
      className="modal"
      data-testid="modal"
      onClick={(e) => {
        const { className } = e.target as HTMLInputElement;
        // Close modal if clicked outside of content
        if (className === "modal") setModalOpen(false);
      }}
    >
      <div className="modal-content">
        <button
          className="close-modal thin-icon"
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
