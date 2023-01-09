import { useState } from "react";

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
    >
      <div>
        <label htmlFor={id}>Your email</label>
        <input
          type="email"
          id={id}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button type="submit">Continue</button>
    </form>
  );
}
