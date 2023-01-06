import useModal from "./useModal";
import { createContext, ReactNode } from "react";

const ModalContext = createContext({});

function ModalProvider({ children }: { children: ReactNode }) {
  const { isModalOpen, toggleModal, modalContent } = useModal();

  return (
    <ModalContext.Provider value={{ isModalOpen, toggleModal, modalContent }}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
