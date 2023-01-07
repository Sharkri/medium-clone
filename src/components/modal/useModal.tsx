import { ReactNode, useState } from "react";

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  function setModalOpen(isOpen: Boolean, content?: ReactNode) {
    setIsModalOpen(isOpen);
    if (content) setModalContent(content);
  }

  return { isModalOpen, setModalOpen, modalContent };
}
