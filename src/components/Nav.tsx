import { Link } from "react-router-dom";
import "../css/Nav.css";

function Nav() {
  return (
    <nav>
      <Link to="#">Our story</Link>
      <Link to="#">Membership</Link>
      <Link to="#">Write</Link>
      <Link to="#">Sign In</Link>
    </nav>
  );
}

export default Nav;
