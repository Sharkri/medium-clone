import { useContext, useState } from "react";
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
  const [disabled, setDisabled] = useState(false);

  const onGoBack = () =>
    setModalOpen(
      true,
      <SignUpOptions hideAnonymousOption={hideAnonymousOption} />
    );

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
        onClick={() =>
          setModalOpen(true, <SignUpFormModal onGoBack={onGoBack} />)
        }
      >
        Sign up with email
      </ButtonWithIcon>
      {!hideAnonymousOption && (
        <>
          <span className="text-grey">or</span>
          <ButtonWithIcon
            icon="fa-solid fa-user-secret"
            disabled={disabled}
            onClick={async () => {
              setDisabled(true);
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
