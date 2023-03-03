import { ReactNode } from "react";

export default function Sidebar({ children }: { children: ReactNode }) {
  return (
    <aside className="h-screen sticky top-0 max-w-[368px] grow flex justify-center pl-8 pr-6 border-l-[1px] border-subtle-white max-lg:hidden">
      {children}
    </aside>
  );
}
