import { useContext } from "react";
import ModalContext from "../modal/ModalContext";

import { signInWithGoogle } from "../../firebase/firebase-app";

import AuthenticationPage from "./AuthenticationPage";
import ButtonWithIcon from "../helper-components/ButtonWithIcon";
import SignUpFormModal from "./SignUpFormModal";

export default function SignUpOptions() {
  const { setModalOpen } = useContext(ModalContext);
  return (
    <AuthenticationPage isSignUpPage={true}>
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
    </AuthenticationPage>
  );
}
