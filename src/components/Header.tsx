import { Link } from "react-router-dom";
import "../css/Header.css";
import Logo from "./helper/Logo";
import Nav from "./Nav";

function Header() {
  return (
    <header className="py-[25px] px-[18px] flex justify-center border-b-[1px] border-black bg-yellow">
      <div className="flex justify-between max-w-[1192px] grow">
        <Link to="/" aria-label="logo">
          <Logo />
        </Link>

        <Nav />
      </div>
    </header>
  );
}

export default Header;
