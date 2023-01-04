import HeaderTitle from "./HeaderTitle";
import "../css/Header.css";
import Nav from "./Nav";

function Header() {
  return (
    <header>
      <div className="header-content">
        <HeaderTitle />
        <Nav />
      </div>
    </header>
  );
}

export default Header;
