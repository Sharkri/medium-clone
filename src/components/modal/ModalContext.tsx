import { createContext, ReactNode } from "react";

interface IModalContext {
  modalContent: ReactNode;
  isModalOpen: Boolean;
  setModalOpen: Function;
}

// Initialize modal context
const ModalContext = createContext<IModalContext>({
  modalContent: null,
  isModalOpen: false,
  setModalOpen: () => {},
});

export default ModalContext;
