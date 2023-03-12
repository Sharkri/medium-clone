import { useContext, useEffect } from "react";

import UserContext from "../../../UserContext";
import ModalContext from "../../modal/ModalContext";

import UpdateUsernameModal from "./UpdateUsernameModal";
import ProfilePicture from "../../helper-components/ProfilePicture";
import Sidebar from "../../main/Sidebar";
import UpdateProfileInfoModal from "./UpdateProfileInfoModal";
import UpdateEmailModal from "./UpdateEmailModal";

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
            <button
              className="flex justify-between gap-2 group"
              onClick={() =>
                setModalOpen(true, <UpdateEmailModal user={user} />)
              }
            >
              <span className="text-sm text-lighterblack">Email address</span>

              <span className="text-grey font-content-sans text-[16.3px] group-hover:text-lightblack line-clamp-1 break-all">
                {user.email}
              </span>
            </button>

            <button
              className="flex justify-between gap-2 group"
              onClick={() =>
                setModalOpen(true, <UpdateUsernameModal user={user} />)
              }
            >
              <span className="text-sm text-lighterblack">Username</span>
              <span className="text-grey font-content-sans text-[16.2px] group-hover:text-lightblack line-clamp-1 break-all">
                @{user.username}
              </span>
            </button>

            <button
              className="flex justify-between text-sm group"
              onClick={() =>
                setModalOpen(true, <UpdateProfileInfoModal user={user} />)
              }
            >
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

                <ProfilePicture src={user.photoURL} className="w-6 h-6 ml-2" />
              </div>
            </button>
          </div>
        </main>
        <Sidebar>
          <div className="flex flex-col">
            <h2 className="font-sohne-bold mt-16 mb-8">
              Suggested help articles
            </h2>
            <div className="text-sm flex flex-col gap-4 text-lighterblack [&>button]:text-left">
              <button>Sign in or sign up to Medium</button>
              <button>Your profile page</button>
              <button>Writing and publishing your first story</button>
              <button>About Medium's distribution system</button>
              <button>Get started with the Partner Program</button>
            </div>
          </div>
        </Sidebar>
      </div>
    </div>
  );
}
