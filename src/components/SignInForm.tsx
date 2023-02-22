import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getAuthInstance } from "../firebase/firebase-app";
import Input from "./helper/Input";
import LoadingButton from "./helper/LoadingButton";
import PasswordInput from "./helper/PasswordInput";
import IError from "./interfaces/ErrorInterface";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState<IError | null>(null);
  const [passwordError, setPasswordError] = useState<IError | null>(null);

  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(getAuthInstance());

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
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
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

      <PasswordInput
        error={passwordError}
        password={password}
        onChange={setPassword}
        autoComplete="current-password"
      />

      <LoadingButton type="submit" loading={loading}>
        Continue
      </LoadingButton>
    </form>
  );
}
