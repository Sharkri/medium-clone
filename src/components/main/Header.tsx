import { Link } from "react-router-dom";
import { signOutUser } from "../../firebase/firebase-app";

import UserData from "../../interfaces/UserDataInterface";

import useScrollDirection from "../hooks/useScrollDirection";

import Nav from "./Nav";
import OpenModalButton from "../helper-components/OpenModalButton";
import SignUpOptions from "../sign_in_and_up/SignUpOptions";
import SignInOptions from "../sign_in_and_up/SignInOptions";
import LogoWithoutText from "../helper-components/LogoWithoutText";

export default function Header({ user }: { user: UserData | null }) {
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={`sticky ${
        scrollDirection === "down" ? "-top-[57px]" : "top-0"
      }  z-10 min-h-[57px] bg-white px-6 border-b border-b-subtle-white flex items-center transition-all duration-250`}
    >
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
            element={<SignUpOptions />}
            className="bg-green hover:bg-dark-green text-white py-[7px] px-[14px] rounded-full text-sm"
          >
            Sign up
          </OpenModalButton>

          <OpenModalButton
            element={<SignInOptions />}
            className="text-grey hover:text-lightblack text-[15px] ml-4"
          >
            Sign In
          </OpenModalButton>
        </div>
      )}
    </header>
  );
}
