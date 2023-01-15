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
          required
        />
      </div>
      <div className="password-container">
        <label htmlFor={passwordId}>Your password</label>
        <input
          type="password"
          id={passwordId}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>

      <button type="submit" className="black-button">
        Continue
      </button>
    </form>
  );
}
