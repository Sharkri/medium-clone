import { useContext } from "react";
import "../css/Hero.css";
import ModalContext from "./modal/ModalContext";
import SignUpModal from "./SignUpModal";

function Hero() {
  const { toggleModal } = useContext(ModalContext);

  return (
    <div className="hero">
      <div className="hero-content">
        <h2 className="hero-text">Stay curious.</h2>
        <h3 className="hero-subtext">
          Discover stories, thinking, and expertise from writers on any topic.
        </h3>
        <button
          className="start-reading"
          onClick={() => toggleModal(<SignUpModal />)}
        >
          Start reading
        </button>
      </div>
    </div>
  );
}

export default Hero;
