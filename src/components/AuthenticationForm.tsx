import { useEffect, useState } from "react";
import "../css/AuthenticationForm.css";
import Error from "../interfaces/ErrorInterface";
import Input from "./helper/Input";
import Spinner from "./helper/Spinner";

interface IError {
  message: string;
}

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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

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

      <Input
        error={passwordError}
        type={isPasswordVisible ? "text" : "password"}
        onChange={setPassword}
        value={password}
        autoComplete="current-password"
        labelText="Your password"
        className="group"
        required
      >
        <button
          aria-label="toggle password visibility"
          className="text-lighterblack absolute right-1 bottom-1 opacity-0 min-w-[17.5px] transition duration-[250ms] group-hover:opacity-100"
          type="button"
          onClick={togglePasswordVisibility}
        >
          <i
            className={`text-sm fa-regular fa-${
              isPasswordVisible ? "eye-slash" : "eye"
            }`}
          />
        </button>
      </Input>

      <button
        type="submit"
        className="flex justify-center items-center w-full min-h-[42px] leading-5 text-[15px] pt-[7px] px-4 pb-[9px] bg-lightblack border-lightblack text-white rounded-full transition duration-[0.25s] hover:bg-black hover:border-lightblack"
      >
        {loading ? <Spinner /> : "Continue"}
      </button>
    </form>
  );
}
