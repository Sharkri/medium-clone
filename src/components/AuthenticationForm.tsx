import { useState } from "react";
import "../css/AuthenticationForm.css";
import uniqid from "uniqid";

export default function AuthenticationForm({
  onSubmit,
}: {
  onSubmit: Function;
}) {
  const [email, setEmail] = useState("");
  const emailId = uniqid();
  const passwordId = uniqid();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email);
      }}
      className="email-form"
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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>

      <button type="submit" className="black-button">
        Continue
      </button>
    </form>
  );
}
