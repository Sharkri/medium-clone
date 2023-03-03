import { User } from "firebase/auth";
import { Link } from "react-router-dom";
import LogoWithoutText from "./helper/LogoWithoutText";
import { signOutUser } from "../firebase/firebase-app";

import Nav from "./Nav";
import OpenModalButton from "./OpenModalButton";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";

export default function Header({ user }: { user: User | null }) {
  return (
    <header className="sticky top-0 z-10 min-h-[57px] bg-white px-6 border-b border-b-subtle-white flex items-center">
      <div className="grow flex">
        <Link to="/">
          <LogoWithoutText />
        </Link>
        {/* TODO: Implement search bar */}
      </div>

      {user ? (
        <Nav user={user} onSignOut={signOutUser} />
      ) : (
        <div>
          <OpenModalButton
            element={<SignUpPage />}
            className="bg-green hover:bg-dark-green text-white py-[7px] px-[14px] rounded-full text-sm"
          >
            Sign up
          </OpenModalButton>

          <OpenModalButton
            element={<SignInPage />}
            className="text-grey hover:text-lightblack text-[15px] ml-4"
          >
            Sign In
          </OpenModalButton>
        </div>
      )}
    </header>
  );
}
