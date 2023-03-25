import { useContext, useState } from "react";
import ModalContext from "../modal/ModalContext";

import {
  continueAnonymously,
  signInWithGoogle,
} from "../../firebase/firebase-app";

import ButtonWithIcon from "../helper-components/ButtonWithIcon";
import AuthenticationPage from "./AuthenticationPage";
import SignInFormModal from "./SignInFormModal";

export default function SignInOptions({
  hideAnonymousOption,
}: {
  hideAnonymousOption?: boolean;
}) {
  const { setModalOpen } = useContext(ModalContext);
  const [disabled, setDisabled] = useState(false);

  const onGoBack = () =>
    setModalOpen(
      true,
      <SignInOptions hideAnonymousOption={hideAnonymousOption} />
    );

  return (
    <AuthenticationPage
      isSignUpPage={false}
      hideAnonymousOption={hideAnonymousOption}
    >
      <ButtonWithIcon
        icon="fa-brands fa-google"
        onClick={async () => {
          await signInWithGoogle();
          setModalOpen(false);
        }}
      >
        Sign in with Google
      </ButtonWithIcon>

      <ButtonWithIcon
        icon="fa-regular fa-envelope"
        onClick={() =>
          setModalOpen(true, <SignInFormModal onGoBack={onGoBack} />)
        }
      >
        Sign in with email
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
