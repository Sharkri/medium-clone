import { useContext } from "react";
import ModalContext from "../modal/ModalContext";

import {
  continueAnonymously,
  signInWithGoogle,
} from "../../firebase/firebase-app";

import AuthenticationPage from "./AuthenticationPage";
import ButtonWithIcon from "../helper-components/ButtonWithIcon";
import SignUpFormModal from "./SignUpFormModal";

export default function SignUpOptions({
  hideAnonymousOption,
}: {
  hideAnonymousOption?: boolean;
}) {
  const { setModalOpen } = useContext(ModalContext);
  return (
    <AuthenticationPage
      isSignUpPage={true}
      hideAnonymousOption={hideAnonymousOption}
    >
      <ButtonWithIcon
        icon="fa-brands fa-google"
        onClick={async () => {
          await signInWithGoogle();
          setModalOpen(false);
        }}
      >
        Sign up with Google
      </ButtonWithIcon>
      <ButtonWithIcon
        icon="fa-regular fa-envelope"
        onClick={() => setModalOpen(true, <SignUpFormModal />)}
      >
        Sign up with email
      </ButtonWithIcon>
      {!hideAnonymousOption && (
        <>
          <span className="text-grey">or</span>
          <ButtonWithIcon
            icon="fa-solid fa-user-secret"
            onClick={async () => {
              await continueAnonymously();
              setModalOpen(false);
            }}
          >
            Sign up anonymously
          </ButtonWithIcon>
        </>
      )}
    </AuthenticationPage>
  );
}
