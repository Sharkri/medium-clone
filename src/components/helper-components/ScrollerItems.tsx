import { ReactNode } from "react";

export default function ScrollerItems({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <nav
      className={`flex border-b border-neutral-200 text-sm text-grey [&>*]:pb-4 [&>*]:mr-8 ${className}`}
    >
      {children}
    </nav>
  );
}
