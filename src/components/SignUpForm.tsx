import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { addUser, getAuthInstance } from "../firebase/firebase-app";
import Input from "./helper/Input";
import LoadingButton from "./helper/LoadingButton";
import PasswordInput from "./helper/PasswordInput";
import IError from "../interfaces/ErrorInterface";
import ModalContext from "./modal/ModalContext";
import UserContext from "../UserContext";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [emailError, setEmailError] = useState<IError | null>(null);
  const [passwordError, setPasswordError] = useState<IError | null>(null);
  const [fullNameError, setFullNameError] = useState<IError | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { setModalOpen } = useContext(ModalContext);
  const { reloadUserData } = useContext(UserContext);

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
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (checkForEmptyInputs()) return;

        setIsLoading(true);

        try {
          const { user } = await createUserWithEmailAndPassword(
            getAuthInstance(),
            email,
            password
          );

          await updateProfile(user, { displayName: fullName });

          // add user to database
          await addUser(user);
          await reloadUserData(user.uid);

          setModalOpen(false);
        } catch (error: unknown) {
          if (error instanceof FirebaseError) {
            handleErrors(error);
          } else console.error("Something went wrong: ", error);
        }

        setIsLoading(false);
      }}
      noValidate
      className="flex flex-col gap-1 items-center"
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
      <Input
        error={fullNameError}
        type="text"
        onChange={setFullName}
        value={fullName}
        labelText="Your full name"
        autoComplete="name"
        required
      />

      <PasswordInput
        error={passwordError}
        password={password}
        onChange={setPassword}
        autoComplete="new-password"
      />

      <LoadingButton type="submit" loading={isLoading}>
        Continue
      </LoadingButton>
    </form>
  );
}
