import { Link } from "react-router-dom";
import UserData from "../../interfaces/UserDataInterface";
import Dropdown from "../helper-components/Dropdown";
import ProfilePicture from "../helper-components/ProfilePicture";

function Nav({ user, onSignOut }: { user: UserData; onSignOut: Function }) {
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

      <Dropdown
        buttonStyles="flex items-center hover:text-lighterblack"
        dropdownStyles="absolute right-0 z-10 bg-white w-[264px] shadow-md border border-neutral-200 rounded-[4px] overflow-y-auto"
      >
        <>
          <ProfilePicture className="h-[31px] w-[31px]" src={user.photoURL} />
          <i className="fa-solid fa-chevron-down text-[8.7px] thin-icon ml-2" />
        </>

        <>
          <div className="flex flex-col py-4 border-b border-b-neutral-200">
            <Link
              to="/new-story"
              className="grow hidden max-md:flex gap-4 items-center py-2 px-6 hover:text-lighterblack"
            >
              <i className="fa-regular fa-pen-to-square thinner-icon text-[21px] min-w-[24px]" />
              <span className="text-sm">Write</span>
            </Link>
            <Link
              to={`/u/${user.username}`}
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
              <p className="text-[13px] break-all line-clamp-1">{user.email}</p>
            </button>
          </div>
        </>
      </Dropdown>
    </nav>
  );
}

export default Nav;
