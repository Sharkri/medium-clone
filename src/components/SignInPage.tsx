import ButtonWithIcon from "./ButtonWithIcon";
import AuthenticationPage from "./AuthenticationPage";
import { useContext } from "react";
import ModalContext from "./modal/ModalContext";
import SignInWithEmail from "./SignInWithEmail";
import { addUser, isNewUser, signInWithGoogle } from "../firebase/firebase-app";
import { UserCredential } from "firebase/auth";

export default function SignInPage() {
  const { setModalOpen } = useContext(ModalContext);

  return (
    <AuthenticationPage isSignUpPage={false}>
      <ButtonWithIcon
        icon="fa-brands fa-google"
        onClick={async () => {
          await signInWithGoogle();
          const userCredential: UserCredential = await signInWithGoogle();
          // if is new user, add user to database
          if (isNewUser(userCredential)) await addUser(userCredential.user);

          setModalOpen(false);
        }}
      >
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
