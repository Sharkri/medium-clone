import { useContext, useEffect } from "react";
import UserContext from "../UserContext";
import ProfilePicture from "./helper/ProfilePicture";
import ModalContext from "./modal/ModalContext";
import Sidebar from "./Sidebar";
import UsernameModal from "./UsernameModal";

export default function Settings() {
  const { user } = useContext(UserContext);
  const { setModalOpen } = useContext(ModalContext);

  useEffect(() => {
    document.title = "Settings - Medium";
    return () => {
      document.title = "Medium";
    };
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-[1336px] m-auto">
      <div className="flex justify-evenly">
        <main className="max-w-[680px] grow mx-6 pb-8">
          <div className="mt-[52px] mb-12 max-md:my-6">
            <h1 className="text-[42px] max-md:text-[22px] font-sohne-semibold text-lighterblack mb-14 max-md:mb-8">
              Settings
            </h1>
            <div className="shadow-[inset_0_-1px_0_rgb(230,230,230)] pb-4">
              <span className="border-b border-lighterblack pb-4 text-sm">
                Account
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <button className="flex justify-between group">
              <span className="text-sm text-lighterblack">Email address</span>

              <span className="text-grey font-content-sans text-[16.3px] group-hover:text-lightblack">
                {user.email}
              </span>
            </button>

            <button
              className="flex justify-between group"
              onClick={() => setModalOpen(true, <UsernameModal user={user} />)}
            >
              <span className="text-sm text-lighterblack">Username</span>
              <span className="text-grey font-content-sans text-[16.2px] group-hover:text-lightblack">
                @{user.username}
              </span>
            </button>

            <button className="flex justify-between text-sm group">
              <div className="text-left">
                <p className="text-lighterblack">Profile information</p>
                <div className="text-[13px] text-grey mt-1">
                  Edit your photo, name, bio, etc.
                </div>
              </div>
              <div className="flex items-center pl-2">
                <span className="text-grey text-sm line-clamp-1 break-all group-hover:text-lightblack">
                  {user.displayName}
                </span>

                <ProfilePicture
                  src={user.photoURL}
                  className="w-6 h-6 rounded-full ml-2"
                />
              </div>
            </button>

            <div className="border-t border-t-neutral-200" />

            <button className="text-sm mb-8 text-left">
              <p className="text-[#c94a4a] mb-1">Delete account</p>
              <span className="text-grey">
                Permanently delete your account and all of your content.
              </span>
            </button>
          </div>
        </main>
        <Sidebar>Hello!</Sidebar>
      </div>
    </div>
  );
}
