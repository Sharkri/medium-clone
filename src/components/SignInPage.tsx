import ButtonWithIcon from "./ButtonWithIcon";
import AuthenticationPage from "./AuthenticationPage";
import { useContext } from "react";
import ModalContext from "./modal/ModalContext";
import SignInWithEmail from "./SignInWithEmail";
import { signInWithGoogle } from "../firebase/firebase-app";
import UserContext from "../UserContext";

export default function SignInPage() {
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
        onClick={() => setModalOpen(true, <SignInWithEmail />)}
      >
        Sign in with email
      </ButtonWithIcon>
    </AuthenticationPage>
  );
}
