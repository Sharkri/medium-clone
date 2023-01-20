import { useEffect, useState } from "react";
import "../css/AuthenticationForm.css";
import Input from "./Input";

interface Error {
  code: string;
  message: string;
}

export default function AuthenticationForm({
  onSubmit,
  error,
  loading,
}: {
  onSubmit: Function;
  error: Error | undefined;
  loading: boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  useEffect(() => {
    if (!error) {
      setEmailError({});
      setPasswordError({});
      return;
    }

    if (error.code.includes("email")) {
      setEmailError({ message: "Please enter a valid email.", active: true });
    } else {
      setPasswordError({
        message: "Password should be at least 6 characters",
        active: true,
      });
    }
  }, [error]);

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
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <i
            className={`fa-regular fa-${
              isPasswordVisible ? "eye-slash" : "eye"
            }`}
          />
        </button>
      </Input>

      <button type="submit" className="black-button" data-loading={loading}>
        Continue
      </button>
    </form>
  );
}
