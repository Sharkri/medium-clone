import { Link } from "react-router-dom";
import User from "../interfaces/UserInterface";
import LogoWithoutText from "./helper/LogoWithoutText";

export default function LoggedInHeader({ user }: { user: User }) {
  return (
    <header className="px-6 h-[57px] border-b-[1px] border-b-subtle-white flex items-center">
      <div className="grow">
        <Link to="/">
          <LogoWithoutText />
        </Link>
        {/* TODO: Implement search bar */}
      </div>

      <div className="flex items-center gap-8 text-neutral-500">
        <button className="flex items-center gap-2 transition duration-100 hover:text-black">
          <i className="fa-regular fa-pen-to-square text-[19px] thin-icon" />
          <span className="text-sm">Write</span>
        </button>

        <button className="flex items-center transition duration-100 hover:text-black">
          <i className="fa-regular fa-bell text-[22px] thin-icon" />
        </button>

        <button className="flex items-center">
          <img
            src={user.photoURL}
            alt={user.displayName}
            width="31"
            height="31"
            className="rounded-full"
          />
          <i className="fa-solid fa-chevron-down text-[8.7px] thin-icon ml-2" />
        </button>
      </div>
    </header>
  );
}
