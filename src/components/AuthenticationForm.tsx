import { useState } from "react";
import "../css/AuthenticationForm.css";
import Input from "./Input";

export default function AuthenticationForm({
  onSubmit,
}: {
  onSubmit: Function;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  return (
    <form
      onSubmit={(e) => {
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

      <button type="submit" className="black-button">
        Continue
      </button>
    </form>
  );
}
