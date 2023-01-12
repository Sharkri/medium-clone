import { Link } from "react-router-dom";
import "../css/Header.css";
import Logo from "./Logo";
import Nav from "./Nav";

function Header() {
  return (
    <header>
      <div className="header-content">
        <Link to="/" aria-label="logo">
          <Logo />
        </Link>

        <Nav />
      </div>
    </header>
  );
}

export default Header;
