import { UserCredential } from "firebase/auth";
import { useContext } from "react";
import { addUser, isNewUser, signInWithGoogle } from "../firebase/firebase-app";
import AuthenticationPage from "./AuthenticationPage";
import ButtonWithIcon from "./ButtonWithIcon";
import ModalContext from "./modal/ModalContext";
import SignUpWithEmail from "./SignUpWithEmail";

export default function SignUpPage() {
  const { setModalOpen } = useContext(ModalContext);

  return (
    <AuthenticationPage isSignUpPage={true}>
      <ButtonWithIcon
        icon="fa-brands fa-google"
        onClick={async () => {
          const userCredential: UserCredential = await signInWithGoogle();
          // if is new user, add user to database
          if (isNewUser(userCredential)) await addUser(userCredential.user);

          // close auth modal after sign up
          setModalOpen(false);
        }}
      >
        Sign up with Google
      </ButtonWithIcon>

      <ButtonWithIcon
        icon="fa-regular fa-envelope"
        onClick={() => setModalOpen(true, <SignUpWithEmail />)}
      >
        Sign up with email
      </ButtonWithIcon>
    </AuthenticationPage>
  );
}
