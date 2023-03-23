import { Link } from "react-router-dom";
import { signOutUser } from "../../firebase/firebase-app";

import AllUserData from "../../interfaces/AllUserData";

import useScrollDirection from "../hooks/useScrollDirection";

import Nav from "./Nav";
import OpenModalButton from "../helper-components/OpenModalButton";
import SignUpOptions from "../sign_in_and_up/SignUpOptions";
import SignInOptions from "../sign_in_and_up/SignInOptions";
import LogoWithoutText from "../helper-components/LogoWithoutText";
import Searchbar from "./Searchbar";

export default function Header({
  user,
  isAnonymous,
}: {
  user: AllUserData | null;
  isAnonymous: boolean;
}) {
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={`sticky ${
        scrollDirection === "down" ? "-top-[57px]" : "top-0"
      }  z-10 min-h-[57px] bg-white px-6 border-b border-b-subtle-white flex items-center transition-all duration-250`}
    >
      <div className="grow flex items-center gap-4">
        <Link to="/">
          <LogoWithoutText />
        </Link>

        <Searchbar />
      </div>

      {user || isAnonymous ? (
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
