import { useContext } from "react";
import { Link } from "react-router-dom";
import "../css/Nav.css";
import ModalContext from "./modal/ModalContext";
import SignInPage from "./SignInPage";

function Nav() {
  const { toggleModal } = useContext(ModalContext);

  return (
    <nav>
      <Link to="#">Our story</Link>
      <Link to="#">Membership</Link>
      <Link to="#">Write</Link>
      <button onClick={() => toggleModal(<SignInPage />)}>Sign In</button>
    </nav>
  );
}

export default Nav;
