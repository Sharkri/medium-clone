import { useId, useState } from "react";
import "../css/AuthenticationForm.css";

export default function AuthenticationForm({
  onSubmit,
}: {
  onSubmit: Function;
}) {
  // random ids for input id
  const [emailId, passwordId] = [useId(), useId()];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password);
      }}
      className="authentication-form"
    >
      <div className="email-container">
        <label htmlFor={emailId}>Your email</label>
        <input
          type="email"
          id={emailId}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoComplete="email"
          required
        />
      </div>
      <div className="password-container">
        <label htmlFor={passwordId}>Your password</label>
        <div className="password-input">
          <input
            type={isPasswordVisible ? "text" : "password"}
            id={passwordId}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="current-password"
            required
          />
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
        </div>
      </div>

      <button type="submit" className="black-button">
        Continue
      </button>
    </form>
  );
}
