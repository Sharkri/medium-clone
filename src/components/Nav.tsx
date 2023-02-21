import { Link } from "react-router-dom";
import OpenModalButton from "./OpenModalButton";
import SignInPage from "./SignInPage";

function Nav() {
  return (
    <nav className="flex items-center gap-6 text-sm">
      <Link to="#">Our story</Link>
      <Link to="#">Membership</Link>
      <Link to="#">Write</Link>
      <OpenModalButton element={<SignInPage />}>Sign In</OpenModalButton>
    </nav>
  );
}

export default Nav;
