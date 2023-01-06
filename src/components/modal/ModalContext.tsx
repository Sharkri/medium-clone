import { createContext, ReactNode } from "react";

interface IModalContext {
  modalContent: ReactNode;
  isModalOpen: Boolean;
  toggleModal: Function;
}

// Initialize modal context
const ModalContext = createContext<IModalContext>({
  modalContent: null,
  isModalOpen: false,
  toggleModal: () => {},
});

export default ModalContext;
