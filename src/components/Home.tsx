import Header from "./Header";
import Hero from "./Hero";
import HomeFeed from "./HomeFeed";
import Modal from "./modal/Modal";
import { ModalProvider } from "./modal/ModalContext";

function Home() {
  return (
    <ModalProvider>
      <Modal />

      <Header />
      <main>
        <Hero />
        <HomeFeed />
      </main>
    </ModalProvider>
  );
}

export default Home;
