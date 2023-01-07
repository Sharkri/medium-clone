import { Link } from "react-router-dom";
import "../css/Nav.css";
import OpenModalButton from "./OpenModalButton";
import SignInPage from "./SignInPage";

function Nav() {
  return (
    <nav>
      <Link to="#">Our story</Link>
      <Link to="#">Membership</Link>
      <Link to="#">Write</Link>
      <OpenModalButton element={<SignInPage />}>Sign In</OpenModalButton>
    </nav>
  );
}

export default Nav;
