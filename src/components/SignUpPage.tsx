import { useContext } from "react";
import { signInWithGoogle } from "../firebase/firebase-app";
import UserContext from "../UserContext";
import AuthenticationPage from "./AuthenticationPage";
import ButtonWithIcon from "./ButtonWithIcon";
import ModalContext from "./modal/ModalContext";
import SignUpWithEmail from "./SignUpWithEmail";

export default function SignUpPage() {
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
        onClick={() => setModalOpen(true, <SignUpWithEmail />)}
      >
        Sign up with email
      </ButtonWithIcon>
    </AuthenticationPage>
  );
}
