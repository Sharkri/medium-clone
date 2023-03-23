import { Link } from "react-router-dom";
import Logo from "../../helper-components/Logo";
import OpenModalButton from "../../helper-components/OpenModalButton";
import useScrollDirection from "../../hooks/useScrollDirection";
import SignInOptions from "../../sign_in_and_up/SignInOptions";
import SignUpOptions from "../../sign_in_and_up/SignUpOptions";

export default function LoggedOutHeader({
  height,
  negativeTop,
}: {
  height: string;
  negativeTop: string;
}) {
  const scrollDirection = useScrollDirection();
  const top = scrollDirection === "down" ? negativeTop : "top-0";
  return (
    <header
      className={`sticky transition-all duration-250 z-10 py-[25px] px-[18px] border-b border-lighterblack bg-yellow ${height} ${top}`}
    >
      <div className="flex justify-between max-w-[1192px] mx-auto">
        <Link to="/" aria-label="logo">
          <Logo />
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <div className="flex gap-6 max-md:hidden">
            <a href="https://github.com/Sharkri/medium-clone">Github Repo</a>
          </div>
          <OpenModalButton
            element={<SignInOptions />}
            className="max-sm:hidden"
          >
            Sign In
          </OpenModalButton>

          <OpenModalButton
            element={<SignUpOptions />}
            className="bg-lightblack text-white rounded-full px-4 py-2 transition-colors duration-300 hover:bg-black"
          >
            Get Started
          </OpenModalButton>
        </nav>
      </div>
    </header>
  );
}
