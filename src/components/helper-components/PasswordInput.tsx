import { useState } from "react";

import IError from "../../interfaces/ErrorInterface";

import Input from "./Input";

export default function PasswordInput({
  password,
  error,
  onChange,
  autoComplete,
}: {
  password: string;
  error: IError | null;
  onChange: Function;
  autoComplete: "current-password" | "new-password";
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Input
      error={error}
      type={isPasswordVisible ? "text" : "password"}
      onChange={onChange}
      value={password}
      autoComplete={autoComplete}
      labelText="Your password"
      className="group"
      required
    >
      <button
        aria-label="toggle password visibility"
        className="text-lighterblack absolute right-1 bottom-1 opacity-0 min-w-[17.5px] transition duration-[250ms] group-hover:opacity-100"
        type="button"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <i
          className={`text-sm fa-regular fa-${
            isPasswordVisible ? "eye-slash" : "eye"
          }`}
        />
      </button>
    </Input>
  );
}
