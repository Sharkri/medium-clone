import { Link } from "react-router-dom";
import Logo from "../../helper-components/Logo";
import Hero from "./Hero";
import HomeFeed from "../../HomeFeed";
import OpenModalButton from "../../helper-components/OpenModalButton";
import SignInOptions from "../../sign_in_and_up/SignInOptions";
import SignUpOptions from "../../sign_in_and_up/SignUpOptions";

function LoggedOutHomepage() {
  return (
    <>
      <header className="py-[25px] px-[18px] flex justify-center border-b border-lighterblack bg-yellow">
        <div className="flex justify-between max-w-[1192px] grow">
          <Link to="/" aria-label="logo">
            <Logo />
          </Link>

          <nav className="flex items-center gap-6 text-sm">
            <div className="flex gap-6 max-md:hidden">
              <Link to="#">Our story</Link>
              <Link to="#">Membership</Link>
              <Link to="#">Write</Link>
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

      <main>
        <Hero />
        <HomeFeed />
      </main>
    </>
  );
}

export default LoggedOutHomepage;
