import { useContext, useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { addUser, getAuthInstance } from "../../firebase/firebase-app";

import IError from "../../interfaces/ErrorInterface";

import Input from "../helper-components/Input";
import LoadingButton from "../helper-components/LoadingButton";
import PasswordInput from "../helper-components/PasswordInput";

import ModalContext from "../modal/ModalContext";
import ModalContent from "../modal/ModalContent";
import GoBackButton from "./GoBackButton";

export default function SignUpFormModal({ onGoBack }: { onGoBack: Function }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [emailError, setEmailError] = useState<IError | null>(null);
  const [passwordError, setPasswordError] = useState<IError | null>(null);
  const [fullNameError, setFullNameError] = useState<IError | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { setModalOpen } = useContext(ModalContext);

  function checkForEmptyInputs() {
    setFullNameError(
      fullName ? null : { message: "Full name cannot be empty." }
    );
    setPasswordError(
      password ? null : { message: "Password cannot be empty." }
    );
    setEmailError(email ? null : { message: "Email cannot be empty." });

    return !fullName || !email || !password;
  }

  function handleErrors(error: FirebaseError) {
    switch (error.code) {
      case "auth/weak-password":
        setPasswordError({
          message: "Password must be at least 6 characters",
        });
        break;

      case "auth/invalid-email":
        setEmailError({
          message: "Please enter a valid email.",
        });
        break;

      case "auth/too-many-requests":
        setEmailError({
          message: "Too many requests. Try again later.",
        });
        break;

      case "auth/email-already-in-use":
        setEmailError({
          message: "Email is already in use",
        });
    }
  }
  return (
    <ModalContent className="grid place-items-center py-8 px-12 text-center max-w-[678px] max-h-[695px] w-full h-full">
      <h2 className="font-serif text-[28px]">Sign up with email</h2>
      <p className="mb-11 mt-7 text-center">
        <span className="max-w-[316px]">
          Enter your email address and a password to create an account.
        </span>
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (
            checkForEmptyInputs() ||
            email.length > 256 ||
            fullName.length > 50
          )
            return;

          setIsLoading(true);

          try {
            const { user } = await createUserWithEmailAndPassword(
              getAuthInstance(),
              email,
              password
            );

            setModalOpen(false);

            // add user to database
            await addUser({ ...user, displayName: fullName });
          } catch (error: unknown) {
            if (error instanceof FirebaseError) {
              handleErrors(error);
            } else console.error("Something went wrong: ", error);
          }

          setIsLoading(false);
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
          maxLength={256}
          required
        />
        <Input
          error={fullNameError}
          type="text"
          onChange={setFullName}
          value={fullName}
          labelText="Your full name"
          maxLength={50}
          autoComplete="name"
          required
        />

        <PasswordInput
          error={passwordError}
          password={password}
          onChange={setPassword}
          autoComplete="new-password"
        />

        <LoadingButton
          type="submit"
          loading={isLoading}
          className="mb-4 grid place-items-center w-full h-[42px] leading-5 text-[15px] pt-[7px] px-4 pb-[9px] bg-lightblack border-lightblack text-white rounded-full transition duration-[0.25s] hover:bg-black hover:border-lightblack"
        >
          Continue
        </LoadingButton>

        <GoBackButton onGoBack={onGoBack}>All sign up options</GoBackButton>
      </form>
    </ModalContent>
  );
}
