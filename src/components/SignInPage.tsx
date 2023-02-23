import ButtonWithIcon from "./ButtonWithIcon";
import AuthenticationPage from "./AuthenticationPage";
import { useContext } from "react";
import ModalContext from "./modal/ModalContext";
import SignInWithEmail from "./SignInWithEmail";
import { signInWithGoogle } from "../firebase/firebase-app";

export default function SignInPage() {
  const { setModalOpen } = useContext(ModalContext);

  return (
    <AuthenticationPage isSignUpPage={false}>
      <ButtonWithIcon icon="fa-brands fa-google" onClick={signInWithGoogle}>
        Sign in with Google
      </ButtonWithIcon>

      <ButtonWithIcon
        icon="fa-regular fa-envelope"
        onClick={() => setModalOpen(true, <SignInWithEmail />)}
      >
        Sign in with email
      </ButtonWithIcon>
    </AuthenticationPage>
  );
}
