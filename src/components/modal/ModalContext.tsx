import useModal from "./useModal";
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

function ModalProvider({ children }: { children: ReactNode }) {
  const { modalContent, isModalOpen, toggleModal } = useModal();

  return (
    <ModalContext.Provider value={{ modalContent, isModalOpen, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
