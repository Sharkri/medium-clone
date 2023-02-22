import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getAuthInstance } from "../firebase/firebase-app";
import Input from "./helper/Input";
import LoadingButton from "./helper/LoadingButton";
import PasswordInput from "./helper/PasswordInput";
import IError from "./interfaces/ErrorInterface";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [emailError, setEmailError] = useState<IError | null>(null);
  const [passwordError, setPasswordError] = useState<IError | null>(null);
  const [fullNameError, setFullNameError] = useState<IError | null>(null);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(getAuthInstance());

  useEffect(() => {
    // if there is no error, hide errors.
    if (!error) {
      setEmailError(null);
      setPasswordError(null);
      setFullNameError(null);
      return;
    }

    // password errors
    if (error.code === "auth/weak-password") {
      setPasswordError({ message: "Password must be at least 6 characters" });
    }

    // email errors
    if (error.code === "auth/invalid-email") {
      setEmailError({
        message: "Please enter a valid email.",
      });
    } else if (error.code === "auth/email-already-in-use") {
      setEmailError({
        message: "Email is already in use",
      });
    } else if (error.code === "auth/too-many-requests") {
      setEmailError({
        message: "Too many requests. Try again later.",
      });
    }
  }, [error]);

  useEffect(() => console.log(user), [user]);

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

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (checkForEmptyInputs()) return;

        createUserWithEmailAndPassword(email, password);
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

      <LoadingButton type="submit" loading={loading}>
        Continue
      </LoadingButton>
    </form>
  );
}
