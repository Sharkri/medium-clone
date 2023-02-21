import { ReactNode, useId } from "react";

interface Error {
  message: string;
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
  error: Error | null;
  onChange: Function;
  value: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
  labelText: string;
  children?: ReactNode;
  className?: string;
}) {
  const id = useId();

  return (
    <div
      className={`flex flex-col items-center gap-3 mt-3 mb-7 ${
        className || ""
      } ${error ? "text-red-700" : "text-lighterblack"}`}
    >
      <label htmlFor={id} className="text-[13.2px] leading-5 text-inherit">
        {labelText}
      </label>
      <div className="relative">
        <input
          id={id}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          type={type}
          autoComplete={autoComplete}
          required={required || false}
          className={`pb-[3px] text-lighterblack outline-none border-b-[1px] border-neutral-400 w-[270px] text-center transition-colors duration-300 hover:border-neutral-600 focus:border-lighterblack ${
            error ? "animate-shake !border-red-500" : ""
          }`}
        />
        {children}
      </div>
      <span className="text-[13px] min-h-[17px] max-w-[300px]">
        {error?.message}
      </span>
    </div>
  );
}
