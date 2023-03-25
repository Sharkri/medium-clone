import { useContext, useEffect, useState } from "react";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getAuthInstance } from "../../firebase/firebase-app";

import ModalContext from "../modal/ModalContext";
import ModalContent from "../modal/ModalContent";

import IError from "../../interfaces/ErrorInterface";

import LoadingButton from "../helper-components/LoadingButton";
import Input from "../helper-components/Input";
import PasswordInput from "../helper-components/PasswordInput";
import GoBackButton from "./GoBackButton";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function SignInFormModal({ onGoBack }: { onGoBack: Function }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState<IError | null>(null);
  const [passwordError, setPasswordError] = useState<IError | null>(null);

  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(getAuthInstance());

  const { setModalOpen } = useContext(ModalContext);

  useEffect(() => {
    // if there is no error, hide errors.
    if (!error) {
      setEmailError(null);
      setPasswordError(null);
      return;
    }

    // password errors
    if (!password) {
      setPasswordError({ message: "Please enter a non-empty password" });
    } else if (error.code === "auth/wrong-password") {
      setPasswordError({ message: "Incorrect password" });
    }

    // email errors
    if (!email || error.code === "auth/invalid-email") {
      setEmailError({
        message: "Please enter a valid email.",
      });
    } else if (error.code === "auth/user-not-found") {
      setEmailError({
        message: "Email not found.",
      });
    } else if (error.code === "auth/too-many-requests") {
      setEmailError({
        message: "Too many requests. Try again later.",
      });
    }
  }, [error]);

  return (
    <ModalContent className="grid place-items-center py-10 px-14 text-center max-w-[678px] max-h-[695px] w-full h-full">
      <h2 className="font-serif text-[28px]">Sign in with email</h2>
      <p className="mb-[50px] mt-[30px] max-w-[316px]">
        Enter the email address associated with your account and enter your
        Medium password.
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const success = await signInWithEmailAndPassword(email, password);

          if (success) setModalOpen(false);
        }}
        noValidate
        className="flex flex-col items-center"
      >
        <Input
          error={emailError}
          type="email"
          onChange={setEmail}
          value={email}
          autoComplete="email"
          labelText="Your email"
          required
        />
        <PasswordInput
          error={passwordError}
          password={password}
          onChange={setPassword}
          autoComplete="current-password"
        />

        <LoadingButton
          type="submit"
          loading={loading}
          className="grid place-items-center w-full h-[42px] leading-5 text-[15px] pt-[7px] px-4 pb-[9px] bg-lightblack border-lightblack text-white rounded-full transition duration-[0.25s] hover:bg-black hover:border-lightblack"
        >
          Continue
        </LoadingButton>

        <button
          type="button"
          className="text-green text-[14.4px] mt-4 mb-2"
          onClick={() => {
            setModalOpen(
              true,
              <ForgotPasswordModal
                onGoBack={() =>
                  setModalOpen(true, <SignInFormModal onGoBack={onGoBack} />)
                }
              />
            );
          }}
        >
          <i className="fa-solid fa-key thin-icon mr-2" />
          Forgot password?
        </button>

        <GoBackButton onGoBack={onGoBack}>All sign in options</GoBackButton>
      </form>
    </ModalContent>
  );
}
