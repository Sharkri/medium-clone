import { Link } from "react-router-dom";
import Logo from "./helper/Logo";
import Hero from "./Hero";
import HomeFeed from "./HomeFeed";
import OpenModalButton from "./OpenModalButton";
import SignInPage from "./SignInPage";

function Home() {
  return (
    <>
      <header className="py-[25px] px-[18px] flex justify-center border-b border-lighterblack bg-yellow">
        <div className="flex justify-between max-w-[1192px] grow">
          <Link to="/" aria-label="logo">
            <Logo />
          </Link>

          <nav className="flex items-center gap-6 text-sm">
            <Link to="#">Our story</Link>
            <Link to="#">Membership</Link>
            <Link to="#">Write</Link>
            <OpenModalButton element={<SignInPage />}>Sign In</OpenModalButton>
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

export default Home;
