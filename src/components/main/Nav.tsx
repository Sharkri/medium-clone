import { Link } from "react-router-dom";
import AllUserData from "../../interfaces/AllUserData";
import Dropdown from "../helper-components/Dropdown";
import ProfilePicture from "../helper-components/ProfilePicture";

function Nav({
  user,
  onSignOut,
}: {
  user: AllUserData | null;
  onSignOut: Function;
}) {
  return (
    <nav className="flex items-center gap-8 text-neutral-500">
      <span
        className={!user ? "opacity-50 cursor-not-allowed" : ""}
        title={!user ? "Anonymous users cannot write posts" : undefined}
      >
        <Link
          to="/new-story"
          className={`flex items-center gap-2 hover:text-lighterblack max-md:hidden ${
            !user ? "pointer-events-none" : ""
          }`}
          title={!user ? "Anonymous cannot write posts" : undefined}
        >
          <i className="fa-regular fa-pen-to-square text-[19px] thinner-icon" />
          <span className="text-sm">Write</span>
        </Link>
      </span>

      <Link
        to="/notifications"
        className="flex items-center hover:text-lighterblack"
      >
        <i className="fa-regular fa-bell text-[22px] thinner-icon" />
      </Link>

      <Dropdown
        buttonStyles="flex items-center hover:text-lighterblack"
        dropdownStyles="w-[264px]"
      >
        <>
          <ProfilePicture
            className="h-[31px] w-[31px] min-w-[31px]"
            src={user?.photoURL}
          />
          <i className="fa-solid fa-chevron-down text-[8.7px] thin-icon ml-2" />
        </>

        <>
          <div className="flex flex-col py-4 child:grow child:flex child:gap-4 child:items-center child:py-2 child:px-6 child-hover:text-lighterblack">
            <Link to="/new-story" className="md:hidden">
              <i className="fa-regular fa-pen-to-square thinner-icon text-[21px] min-w-[24px]" />
              <span className="text-sm">Write</span>
            </Link>

            <Link to={user ? `/u/${user.username}` : "/404"}>
              <i className="fa-regular fa-user thinner-icon text-[21px] min-w-[24px]" />
              <p className="text-sm">Profile</p>
            </Link>

            <Link to={user ? "/library" : "/404"}>
              <i className="fa-regular fa-bookmark thinner-icon text-xl min-w-[24px]" />
              <p className="text-sm">Library</p>
            </Link>
          </div>

          <div className="border-b border-b-neutral-200" />

          <div className="flex py-[18px]">
            <Link
              to={user ? "/settings" : "/404"}
              className="grow text-sm py-[6px] px-6 hover:text-lighterblack"
            >
              Settings
            </Link>
          </div>

          <div className="border-b border-b-neutral-200" />

          <div className="py-[18px] flex">
            <button
              onClick={() => onSignOut()}
              className="grow text-left py-[6px] px-6 group"
            >
              <div className="text-sm mb-1 group-hover:text-lighterblack">
                Sign out
              </div>
              <p className="text-[13px] break-all line-clamp-1">
                {user?.email || "anonymous@mail.com"}
              </p>
            </button>
          </div>
        </>
      </Dropdown>
    </nav>
  );
}

export default Nav;
