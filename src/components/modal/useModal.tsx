import { ReactNode, useState } from "react";

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  function toggleModal(content?: ReactNode) {
    setIsModalOpen((prevState) => !prevState);
    if (content) setModalContent(content);
  }

  return { isModalOpen, toggleModal, modalContent };
}
