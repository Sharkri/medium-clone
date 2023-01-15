import { ReactNode, useId } from "react";
import "../css/Input.css";

interface Error {
  message?: string;
  code?: string;
}

export default function Input({
  error,
  onChange,
  value,
  autoComplete,
  required,
  type,
  labelText,
  children,
  className,
}: {
  error: Error;
  onChange: Function;
  value: string;
  type: string;
  required: boolean;
  autoComplete: string;
  labelText: string;
  children?: ReactNode;
  className?: string;
}) {
  const id = useId();

  return (
    <div className={`input-container ${className}`}>
      <label htmlFor={id}>{labelText}</label>
      <div className="input">
        <input
          id={id}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          type={type}
          autoComplete={autoComplete}
          required={required}
          className={error ? "error" : ""}
        />
        {children}
      </div>
    </div>
  );
}
