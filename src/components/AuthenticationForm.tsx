import { useEffect, useState } from "react";
import Error from "../interfaces/ErrorInterface";
import Input from "./helper/Input";
import PasswordInput from "./helper/PasswordInput";
import Spinner from "./helper/Spinner";
import IError from "./interfaces/ErrorInterface";

export default function AuthenticationForm({
  onSubmit,
  loading,
  error,
}: {
  onSubmit: Function;
  loading: Boolean;
  error: Error | undefined;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState<IError | null>(null);
  const [passwordError, setPasswordError] = useState<IError | null>(null);

  useEffect(() => {
    if (error) {
      const { code: errorCode, message: errorMessage } = error;

      const errorObj = { message: errorMessage };
      // if is email error
      if (errorCode.includes("email")) setEmailError(errorObj);
      // else, is password error
      else setPasswordError(errorObj);
    } else {
      // if no error
      setEmailError(null);
      setPasswordError(null);
    }
  }, [error]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        onSubmit(email, password);
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
      />

      <button
        type="submit"
        className="flex justify-center items-center w-full min-h-[42px] leading-5 text-[15px] pt-[7px] px-4 pb-[9px] bg-lightblack border-lightblack text-white rounded-full transition duration-[0.25s] hover:bg-black hover:border-lightblack"
      >
        {loading ? <Spinner /> : "Continue"}
      </button>
    </form>
  );
}
