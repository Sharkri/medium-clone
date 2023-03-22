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
      className={`flex border-b border-neutral-200 text-sm text-grey child:pb-4 child:mr-8 child-hover:text-lighterblack ${className}`}
    >
      {children}
    </nav>
  );
}
