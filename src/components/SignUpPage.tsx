import { useContext } from "react";
import AuthenticationPage from "./AuthenticationPage";
import ButtonWithIcon from "./ButtonWithIcon";
import ModalContext from "./modal/ModalContext";
import SignUpWithEmail from "./SignUpWithEmail";

export default function SignUpPage() {
  const { setModalOpen } = useContext(ModalContext);

  return (
    <AuthenticationPage isSignUpPage={true}>
      <ButtonWithIcon icon="fa-brands fa-google" onClick={() => {}}>
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
