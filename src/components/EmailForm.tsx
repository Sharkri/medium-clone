import { useState } from "react";
import "../css/EmailForm.css";

export default function EmailForm({
  onSubmit,
  id,
}: {
  onSubmit: Function;
  id: string;
}) {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email);
      }}
      className="email-form"
    >
      <div className="input-container">
        <label htmlFor={id}>Your email</label>
        <input
          type="email"
          id={id}
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
