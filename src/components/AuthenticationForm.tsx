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
      className="authentication-form"
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
        className="password-container"
        required
      >
        <button
          aria-label="toggle password visibility"
          className="toggle-password-visible"
          type="button"
          onClick={togglePasswordVisibility}
        >
          <i
            className={`fa-regular fa-${
              isPasswordVisible ? "eye-slash" : "eye"
            }`}
          />
        </button>
      </Input>

      <button type="submit" className="black-button">
        {loading ? <Spinner /> : "Continue"}
      </button>
    </form>
  );
}
