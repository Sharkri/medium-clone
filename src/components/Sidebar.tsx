import { ReactNode } from "react";

export default function Sidebar({ children }: { children: ReactNode }) {
  return (
    <aside className="h-auto self-start sticky top-[57px] max-w-[368px] grow flex justify-center pl-8 pr-6 border-l border-subtle-white max-lg:hidden">
      {children}
    </aside>
  );
}
