import { FormEvent, useContext, useState } from "react";
import { changeUsername } from "../firebase/firebase-app";
import UserData from "../interfaces/UserDataInterface";
import CloseModalButton from "./modal/CloseModalButton";
import ModalContent from "./modal/ModalContent";
import ModalContext from "./modal/ModalContext";

export default function UsernameModal({ user }: { user: UserData }) {
  const [newUsername, setNewUsername] = useState(user.username);
  const { setModalOpen } = useContext(ModalContext);

  const isAlphanumericUsername = newUsername.match(/^[\w]+$/);

  const error =
    newUsername.length > 30 ||
    newUsername.length === 0 ||
    !isAlphanumericUsername;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (error || user.username === newUsername) return;

    await changeUsername(user.uid, newUsername);
    setModalOpen(false);
  }

  return (
    <ModalContent className="pt-8 px-10 pb-10 text-center max-w-[552px] w-full">
      <CloseModalButton />

      <form onSubmit={handleSubmit} noValidate>
        <h1 className="text-lighterblack text-[22px] font-sohne-bold text-left mb-10">
          Username
        </h1>

        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="text-grey mb-[10px] text-left text-sm"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            prefix="@"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className={`outline-none border-b ${
              error ? "border-b-red-700" : "border-b-neutral-200"
            } py-1 pr-3`}
          />

          <div className="flex justify-between gap-4 text-[13px] text-grey mt-1">
            {error ? (
              <p className="text-red-700 text-left max-w-xs">
                {newUsername.length > 30 || newUsername.length === 0
                  ? "Username length must be 1-30 characters in length"
                  : 'Username can only contain letters, numbers, and "_"'}
              </p>
            ) : (
              <p>medium.com/@{newUsername}</p>
            )}
            <p>
              <span
                className={`${
                  newUsername.length > 30 ? "text-red-700" : "text-lightblack"
                }`}
              >
                {newUsername.length}
              </span>
              /30
            </p>
          </div>
        </div>
        <div className="mt-10 flex gap-4 justify-end text-sm">
          <button
            className="text-[#0f730c] border-[#0f730c] border rounded-full pt-2 px-7 pb-[10px]"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="disabled:opacity-30 bg-green pt-2 px-7 pb-[10px] text-white rounded-full"
            disabled={error || newUsername === user.username}
          >
            Save
          </button>
        </div>
      </form>
    </ModalContent>
  );
}
