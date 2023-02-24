import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOutUser } from "../firebase/firebase-app";
import User from "../interfaces/UserInterface";
import LogoWithoutText from "./helper/LogoWithoutText";

export default function LoggedInHeader({ user }: { user: User }) {
  const defaultProfilePic = require("../assets/default-profile.png");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // event listener for when click outside of dropdown
  useEffect(() => {
    function handleClick() {
      if (isDropdownOpen) setIsDropdownOpen(false);
    }

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <header className="px-6 h-[57px] border-b-[1px] border-b-subtle-white flex items-center">
      <div className="grow">
        <Link to="/">
          <LogoWithoutText />
        </Link>
        {/* TODO: Implement search bar */}
      </div>

      <div className="flex items-center gap-8 text-neutral-500">
        <Link
          to="/new-story"
          className="flex items-center gap-2 hover:text-lighterblack"
        >
          <i className="fa-regular fa-pen-to-square text-[19px] thinner-icon" />
          <span className="text-sm">Write</span>
        </Link>

        <Link
          to="/notifications"
          className="flex items-center hover:text-lighterblack"
        >
          <i className="fa-regular fa-bell text-[22px] thinner-icon" />
        </Link>

        <div className="relative">
          <button
            className="flex items-center hover:text-lighterblack"
            onClick={(e) => {
              e.nativeEvent.stopImmediatePropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
          >
            <img
              src={user.photoURL || defaultProfilePic}
              alt={user.displayName}
              width="31"
              height="31"
              className="rounded-full"
            />
            <i className="fa-solid fa-chevron-down text-[8.7px] thin-icon ml-2" />
          </button>

          {isDropdownOpen && (
            <div className="absolute bg-white right-0 w-[264px] shadow-md border-[1px] border-neutral-200 rounded-[4px] overflow-y-auto m-h-[1167px]">
              <div className="flex flex-col py-4 border-b-[1px] border-b-neutral-200">
                <Link
                  to="/profile"
                  className="grow flex gap-4 items-center py-2 px-6 hover:text-lighterblack"
                >
                  <i className="fa-regular fa-user thinner-icon text-[21px] min-w-[24px]" />
                  <p className="text-sm break-all">Profile</p>
                </Link>

                <Link
                  to="/library"
                  className="grow flex gap-4 items-center py-2 px-6 hover:text-lighterblack"
                >
                  <i className="fa-regular fa-bookmark thinner-icon text-xl min-w-[24px]" />
                  <p className="text-sm break-all">Library</p>
                </Link>
              </div>

              <div className="flex py-[18px] border-b-[1px] border-b-neutral-200">
                <Link
                  to="/settings"
                  className="grow text-sm py-[6px] px-6 hover:text-lighterblack"
                >
                  Settings
                </Link>
              </div>

              <div className="py-[18px] flex">
                <button
                  onClick={signOutUser}
                  className="grow text-left py-[6px] px-6 group"
                >
                  <div className="text-sm mb-1 group-hover:text-lighterblack">
                    Sign out
                  </div>
                  <p className="text-[13px] break-all line-clamp-1">
                    {user.email}
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
