import { useContext } from "react";
import ModalContext from "./ModalContext";

function Modal() {
  const { isModalOpen, modalContent, setModalOpen } = useContext(ModalContext);

  return isModalOpen ? (
    <div
      className="fixed left-0 right-0 top-0 bottom-0 z-20 flex justify-center items-center bg-white/95 animate-fade-in"
      data-testid="modal"
      id="modal"
      onMouseDown={(e) => {
        const modalEdgeClicked = (e.target as HTMLElement).id === "modal";
        // Close modal if clicked outside of modal-content (i.e. the edge of modal)
        if (modalEdgeClicked) setModalOpen(false);
      }}
    >
      {modalContent}
    </div>
  ) : null;
}

export default Modal;
