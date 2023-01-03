import Logo from "./Logo";
import { Link } from "react-router-dom";

function HeaderTitle() {
  return (
    <Link to="/">
      <Logo />
    </Link>
  );
}

export default HeaderTitle;
