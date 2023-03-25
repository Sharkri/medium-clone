import { updatePassword } from "firebase/auth";
import { FormEvent, useContext, useState } from "react";
import { getAuthInstance } from "../../../firebase/firebase-app";
import LoadingButton from "../../helper-components/LoadingButton";
import ModalContent from "../../modal/ModalContent";
import ModalContext from "../../modal/ModalContext";

export default function UpdatePasswordModal() {
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { setModalOpen } = useContext(ModalContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const { currentUser } = getAuthInstance();

      if (currentUser != null) await updatePassword(currentUser, newPassword);

      setModalOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <ModalContent className="pt-8 px-10 pb-10 max-w-[552px] w-full">
      <form onSubmit={handleSubmit} noValidate>
        <h1 className="text-lighterblack text-[22px] font-sohne-bold mb-10">
          Password
        </h1>

        <input
          type="password"
          id="password"
          value={newPassword}
          autoComplete="new-password"
          onChange={(e) => setNewPassword(e.target.value)}
          className={`text-sm w-full outline-none border-b ${
            errorMsg ? "border-red-700" : "border-neutral-200 focus:border-grey"
          } py-1 pr-3`}
          minLength={6}
        />

        <div className="text-[13px] text-grey mt-1">
          {errorMsg ? (
            <span className="text-red-700">{errorMsg}</span>
          ) : (
            "Password must be at least 6 characters"
          )}
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
            className="flex justify-center disabled:opacity-30 w-[85.97px] h-[40px] bg-green pt-2 px-7 pb-[10px] text-white rounded-full"
            disabled={loading}
            loading={loading}
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </ModalContent>
  );
}
