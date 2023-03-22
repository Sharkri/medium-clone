import { FormEvent, useContext, useState } from "react";

import { updateUser } from "../../../firebase/firebase-app";

import UserData from "../../../interfaces/UserDataInterface";

import ModalContext from "../../modal/ModalContext";

import ModalContent from "../../modal/ModalContent";
import LoadingButton from "../../helper-components/LoadingButton";

export default function UsernameModal({ user }: { user: UserData }) {
  const [newUsername, setNewUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);
  const { setModalOpen } = useContext(ModalContext);

  const isAlphanumericUsername = newUsername.match(/^[\w]+$/);

  const error =
    newUsername.length > 30 ||
    newUsername.length === 0 ||
    !isAlphanumericUsername;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (error || user.username === newUsername || loading) return;
    setLoading(true);

    await updateUser(user.uid, {
      username: newUsername,
      lowercaseUsername: newUsername.toLowerCase(),
    });

    setLoading(false);

    setModalOpen(false);
  }

  return (
    <ModalContent className="pt-8 px-10 pb-10 max-w-[552px] w-full">
      <form onSubmit={handleSubmit} noValidate>
        <h1 className="text-lighterblack text-[22px] font-sohne-bold mb-10">
          Username
        </h1>

        <div className="flex flex-col text-sm">
          <label htmlFor="username" className="text-grey mb-[10px]">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className={`outline-none border-b ${
              error ? "border-red-700" : "border-neutral-200 focus:border-grey"
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
                className={
                  newUsername.length > 30 ? "text-red-700" : "text-lightblack"
                }
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
            type="button"
          >
            Cancel
          </button>
          <LoadingButton
            type="submit"
            className="disabled:opacity-30 bg-green pt-2 px-7 pb-[10px] text-white rounded-full"
            disabled={error || newUsername === user.username || loading}
            loading={loading}
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </ModalContent>
  );
}
