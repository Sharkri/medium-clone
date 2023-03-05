import { useContext } from "react";
import ModalContext from "../modal/ModalContext";
import UserContext from "../../UserContext";

import { signInWithGoogle } from "../../firebase/firebase-app";

import ButtonWithIcon from "../helper-components/ButtonWithIcon";
import AuthenticationPage from "./AuthenticationPage";
import SignInFormModal from "./SignInFormModal";

export default function SignInOptions() {
  const { setModalOpen } = useContext(ModalContext);
  const { reloadUserData } = useContext(UserContext);

  return (
    <AuthenticationPage isSignUpPage={false}>
      <ButtonWithIcon
        icon="fa-brands fa-google"
        onClick={async () => {
          const { user, newUser } = await signInWithGoogle();
          if (newUser) await reloadUserData(user.uid);
          setModalOpen(false);
        }}
      >
        Sign in with Google
      </ButtonWithIcon>

      <ButtonWithIcon
        icon="fa-regular fa-envelope"
        onClick={() => setModalOpen(true, <SignInFormModal />)}
      >
        Sign in with email
      </ButtonWithIcon>
    </AuthenticationPage>
  );
}
