import Header from "./Header";
import Hero from "./Hero";
import HomeFeed from "./HomeFeed";
import Modal from "./modal/Modal";
import ModalContext from "./modal/ModalContext";
import useModal from "./modal/useModal";

function Home() {
  const { modalContent, setModalOpen, isModalOpen } = useModal();

  return (
    <ModalContext.Provider value={{ modalContent, setModalOpen, isModalOpen }}>
      <Modal />

      <Header />
      <main>
        <Hero />
        <HomeFeed />
      </main>
    </ModalContext.Provider>
  );
}

export default Home;
