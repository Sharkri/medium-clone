import { useContext } from "react";
import ModalContext from "./ModalContext";

export default function CloseModalButton() {
  const { setModalOpen } = useContext(ModalContext);

  return (
    <button
      className="absolute top-2 right-3 text-gray-600 text-2xl transition-colors duration-200 hover:text-black"
      onClick={() => setModalOpen(false)}
      aria-label="close"
      type="button"
    >
      <i className="fa-solid fa-xmark thinnest-icon" />
    </button>
  );
}
