import { useContext } from "react";
import UserContext from "../../UserContext";
import ModalContext from "../modal/ModalContext";

import { signInWithGoogle } from "../../firebase/firebase-app";

import AuthenticationPage from "./AuthenticationPage";
import ButtonWithIcon from "../helper-components/ButtonWithIcon";
import SignUpFormModal from "./SignUpFormModal";

export default function SignUpOptions() {
  const { setModalOpen } = useContext(ModalContext);
  const { reloadUserData } = useContext(UserContext);
  return (
    <AuthenticationPage isSignUpPage={true}>
      <ButtonWithIcon
        icon="fa-brands fa-google"
        onClick={async () => {
          const { user, newUser } = await signInWithGoogle();
          // reload data if new user since data hasn't updated yet
          if (newUser) await reloadUserData(user.uid);
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
