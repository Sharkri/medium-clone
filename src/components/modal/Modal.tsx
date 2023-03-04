import { useContext } from "react";
import ModalContext from "./ModalContext";

function Modal() {
  const { isModalOpen, modalContent, setModalOpen } = useContext(ModalContext);
  return isModalOpen ? (
    <div
      className="fixed left-0 right-0 top-0 bottom-0 z-20 flex justify-center items-center bg-white/95 animate-fade-in"
      data-testid="modal"
      onClick={(e) => {
        const modalContentClicked = (e.target as HTMLInputElement).closest(
          "#modal-content"
        );
        // Close modal if clicked outside of modal-content (i.e. the edge of modal)
        if (!modalContentClicked) setModalOpen(false);
      }}
    >
      <div
        className="flex flex-col justify-center items-center overflow-auto rounded bg-white py-10 px-14 shadow-lg relative text-center max-w-[678px] max-h-[695px] w-full h-full animate-fade-scale-in"
        id="modal-content"
      >
        <button
          className="absolute top-2 right-3 text-gray-600 text-2xl transition-colors duration-200 hover:text-black"
          onClick={() => setModalOpen(false)}
          aria-label="close"
        >
          <i className="fa-solid fa-xmark thinnest-icon" />
        </button>

        {modalContent}
      </div>
    </div>
  ) : null;
}

export default Modal;
