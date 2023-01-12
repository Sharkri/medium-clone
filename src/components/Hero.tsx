import "../css/Hero.css";
import OpenModalButton from "./OpenModalButton";
import SignUpPage from "./SignUpPage";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h2 className="hero-text serif">Stay curious.</h2>
        <h3 className="hero-subtext">
          Discover stories, thinking, and expertise from writers on any topic.
        </h3>

        <OpenModalButton
          element={<SignUpPage />}
          className="start-reading black-button"
        >
          Start reading
        </OpenModalButton>
      </div>
    </div>
  );
}

export default Hero;
