import { User } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProfilePicture from "./helper/ProfilePicture";

function Nav({ user, onSignOut }: { user: User; onSignOut: Function }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // event listener for when click outside of dropdown
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      // if clicked outside of dropdown menu, close it.
      if (!dropdownRef?.current?.contains(e.target as HTMLElement)) {
        setIsDropdownOpen(false);
      }
    }

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <nav className="flex items-center gap-8 text-neutral-500">
      <Link
        to="/new-story"
        className="flex items-center gap-2 hover:text-lighterblack max-md:hidden"
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
          <ProfilePicture
            className="rounded-full h-[31px] w-[31px]"
            src={user.photoURL}
          />
          <i className="fa-solid fa-chevron-down text-[8.7px] thin-icon ml-2" />
        </button>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-10 bg-white right-0 w-[264px] shadow-md border border-neutral-200 rounded-[4px] overflow-y-auto m-h-[1167px]"
          >
            <div className="flex flex-col py-4 border-b border-b-neutral-200">
              <Link
                to="/new-story"
                className="grow hidden max-md:flex gap-4 items-center py-2 px-6 hover:text-lighterblack"
              >
                <i className="fa-regular fa-pen-to-square thinner-icon text-[21px] min-w-[24px]" />
                <span className="text-sm">Write</span>
              </Link>

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

            <div className="flex py-[18px] border-b border-b-neutral-200">
              <Link
                to="/settings"
                className="grow text-sm py-[6px] px-6 hover:text-lighterblack"
              >
                Settings
              </Link>
            </div>

            <div className="py-[18px] flex">
              <button
                onClick={() => onSignOut()}
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
    </nav>
  );
}

export default Nav;
